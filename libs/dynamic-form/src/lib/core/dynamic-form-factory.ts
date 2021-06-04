import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  ValidatorFn,
  AsyncValidatorFn,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import {
  FieldTemplate,
  FieldOption,
  FieldConditionValue,
  DynamicFormInputs,
  FormValues,
  DynamicFormFieldComponentConfig,
} from '../dynamic-form.types';
import { DynamicFormComponentsService } from './dynamic-form-components.service';

export class DynamicFormFactory {
  private form: FormGroup;
  /* Refactor localisation! */
  private locales: string[];
  private localize: boolean;

  constructor(
    private fb: FormBuilder,
    private componentsService: DynamicFormComponentsService,
  ) {}

  contructForm({
    fields,
    values,
    locales,
    ...inputs
  }: DynamicFormInputs): FormGroup {
    this.localize = locales && locales.length > 0;
    this.locales = locales;
    const mergedValues = this.mergeValues(values, inputs.form);
    const formControls = this.formControlsFactory(
      fields as FieldTemplate[],
      mergedValues,
    );
    const form = this.fb.group(formControls);
    this.form = form;

    return this.form;
  }

  private mergeValues(
    inputValues?: FormValues, // Values from input
    initialForm?: FormGroup, // Old form values before rebuild
  ): FormValues {
    if (inputValues && typeof inputValues === 'object') {
      if (initialForm && initialForm.value) {
        return { ...inputValues, ...initialForm.value };
      }
      return inputValues;
    }
    if (initialForm && initialForm.value) {
      return initialForm.value;
    }
    return null;
  }

  public formControlsFactory(
    fields: FieldTemplate[],
    values?: FormValues,
  ): { [key: string]: AbstractControl } {
    return fields.reduce((acc, field) => {
      const { type } = field;

      const fieldConfig = this.componentsService.getComponentConfig(type);

      if (!fieldConfig || fieldConfig.type === 'visual') {
        console.warn('Invalid field type (not registered)', { type });
        return acc;
      }

      const value = this.getValueForField(field, values);
      const validators = this._getValidators(field, fieldConfig);

      if (fieldConfig.type === 'formArray') {
        const [validation, asyncValidation] = validators;
        if (value && Array.isArray(value) && value.length > 0) {
          const group = value.map((val) => {
            const controls = this.formControlsFactory(
              field.fields as FieldTemplate[],
              val,
            );
            return this.fb.group(controls);
          });
          return {
            ...acc,
            [field.key]: this.fb.array(group, validation, asyncValidation),
          };
        }
        return {
          ...acc,
          [field.key]: this.fb.array(value || [], validation, asyncValidation),
        };
      }

      if (
        fieldConfig.type === 'formGroup' ||
        fieldConfig.type === 'flatGroup'
      ) {
        const controls = this.formControlsFactory(
          field.fields as FieldTemplate[],
          value,
        );

        if (fieldConfig.type === 'flatGroup') {
          return {
            ...acc,
            ...controls,
          };
        }

        return {
          ...acc,
          [field.key]: this.fb.group(controls),
        };
      }

      if (field.options) {
        if (field.output === 'boolean-map') {
          const group = this.contructControlFromOptions(field.options, value);
          return {
            ...acc,
            [field.key]: group,
          };
        }
      }

      const control = [value, ...validators];
      return { ...acc, [field.key]: control };
    }, {});
  }

  private getValueForField(
    { key, value, defaultValue }: FieldTemplate,
    values?: any,
  ) {
    if (!values || !key) {
      return null;
    }

    if (typeof values !== 'object') {
      return null;
    }

    if (values[key]) {
      return values[key];
    }

    if (value) {
      return value;
    }

    if (defaultValue) {
      return defaultValue;
    }

    return null;
  }

  private contructControlFromOptions(
    options: FieldOption[],
    defaultValue: boolean,
  ) {
    const controls = options.reduce((acc, option) => {
      return { ...acc, [option.key]: defaultValue };
    }, {});
    const g = this.fb.group(controls);
    return g;
  }

  private _getValidators(
    { validation, condition }: FieldTemplate,
    fieldConfig: DynamicFormFieldComponentConfig,
  ): [ValidatorFn[], AsyncValidatorFn[]] {
    const validators: ValidatorFn[] = fieldConfig.defaultValidators || [];
    const asyncValidators: AsyncValidatorFn[] = [];

    if (!validation) {
      return [validators, asyncValidators];
    }

    /* From validators */
    if (validation.required) {
      if (condition) {
        validators.push(this._requiredWithParent(condition));
      } else {
        validators.push(Validators.required);
      }
    }

    /* Numeric */
    if (validation.min) {
      validators.push(Validators.min(validation.min));
    }
    if (validation.max) {
      validators.push(Validators.max(validation.max));
    }

    /* Length */
    if (validation.minLength) {
      const validatorFn = this.createValidatorFn<any[]>(
        (value) => value.length >= validation.minLength,
        'minLength',
      );
      validators.push(validatorFn);
    }
    if (validation.maxLength) {
      const validatorFn = this.createValidatorFn<any[]>(
        (value) => value.length <= validation.maxLength,
        'maxLength',
      );
      validators.push(validatorFn);
    }

    /* Items */
    if (validation.minItems) {
      const validatorFn = this.createValidatorFn<any[]>(
        (value) => Array.isArray(value) && value.length >= validation.minItems,
        'minItems',
      );
      validators.push(validatorFn);
    }
    if (validation.maxItems) {
      const validatorFn = this.createValidatorFn<any[]>(
        (value) => Array.isArray(value) && value.length <= validation.maxItems,
        'maxItems',
      );
      validators.push(validatorFn);
    }

    /* Pattern */
    if (validation.pattern) {
      validators.push(Validators.pattern(validation.pattern));
    }
    if (validation.patterns) {
      for (const patternName in validation.patterns) {
        if (
          Object.prototype.hasOwnProperty.call(validation.patterns, patternName)
        ) {
          const pattern = validation.patterns[patternName];
          const validatorFn = this.createValidatorFn<string>(
            (value) => new RegExp(pattern).test(value),
            patternName,
          );
          validators.push(validatorFn);
        }
      }
    }

    return [validators, asyncValidators];
  }

  private _requiredWithParent(
    // group: FormGroup,
    condition: FieldConditionValue,
    // control: AbstractControl,
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (!control.parent || !control.parent.controls[condition.key]) {
        return null;
      }
      const parentValue = control.parent.controls[condition.key].value;
      if (!condition.values && typeof condition.values !== 'boolean') {
        return null;
      }
      const parentIsTrue =
        typeof condition.values === 'boolean'
          ? condition.values === parentValue
          : condition.values.includes(parentValue);

      const validation = parentIsTrue ? { conditionalRequired: true } : null;

      return validation;
    };
  }

  private createValidatorFn<T>(condition: (value: T) => boolean, name: string) {
    const validatorFn: ValidatorFn = (control) => {
      if (!control.value) {
        return null;
      }
      const valid = condition(control.value);
      if (valid) {
        return null;
      }
      return { [name]: { valid: false } };
    };

    return validatorFn;
  }
}
