import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  ValidatorFn,
  AsyncValidatorFn,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { DynamicFormComponents } from './dynamic-form-components';
import {
  FieldTemplate,
  FieldOption,
  FieldConditionValue,
  DynamicFormInputs,
  FormValues,
  DynamicFormFieldComponentConfig,
} from '../dynamic-form.types';

export class DynamicFormFactory {
  private form: FormGroup;
  /* Refactor localisation! */
  private locales: string[];
  private localize: boolean;

  constructor(
    private fb: FormBuilder,
    private formComponents: DynamicFormComponents,
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
      const fieldConfig = this.formComponents.getComponentConfig(type);

      if (!fieldConfig || fieldConfig.type === 'visual') {
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
    { type, validation, condition, asyncCondition, output }: FieldTemplate,
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
      if (type === 'repeater') {
        validators.push(this._minLengthArray(validation.minLength));
      } else {
        validators.push(Validators.minLength(validation.minLength));
      }
    }
    if (validation.maxLength) {
      validators.push(Validators.maxLength(validation.maxLength));
    }
    if (validation.pattern) {
      validators.push(Validators.pattern(validation.pattern));
    }

    return [validators, asyncValidators];
  }

  /* Check me */
  private requiredIf(
    group: FormGroup,
    parent: FieldConditionValue,
    asyncCondition: (form: FormGroup) => Observable<boolean>,
    control: AbstractControl,
  ) {
    if (asyncCondition) {
      const conditionValue = asyncCondition(group).pipe(first()).toPromise();
      const validation = conditionValue ? { conditionalRequired: true } : null;
      return new Promise((resolve) => resolve(validation));
    }

    if (parent) {
      const parentControl = group.get(parent.key);
      if (!parentControl) {
        return new Promise((resolve) => resolve(null));
      }
      const parentValue = parentControl.value;

      const parentIsTrue =
        typeof parent.values === 'boolean'
          ? parent.values === parentValue
          : parent.values.includes(parentValue);

      const validation =
        parentValue && parentIsTrue && !control.value.length
          ? { conditionalRequired: true }
          : null;
      return new Promise((resolve) => resolve(validation));
    }

    return new Promise((resolve) => resolve(null));
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

  private _minLengthArray(min: number) {
    return (c: AbstractControl): { [key: string]: any } => {
      if (c.value.length >= min) {
        return null;
      }

      return { minLengthArray: { valid: false } };
    };
  }
}
