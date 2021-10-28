import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { isDefined } from '../common/common.helpers';
import {
  AppObject,
  DynamicFormFieldComponentConfig,
  DynamicFormOptionsFieldChanges,
  DynamicFormOptionsFieldChangesDistinct,
  FieldConditionValue,
  FieldOption,
  FieldTemplate,
  FormValues,
  Locale,
  ValueMergeStrategy,
  ValueMergeStrategyOn,
} from '../dynamic-form.types';
import { DynamicFormComponentsService } from './dynamic-form-components.service';
import { FormStateService } from './form-state.service';

@Injectable()
export class DynamicFormFactoryService {
  private locales: Locale[];
  private localize: boolean;

  constructor(
    private fb: FormBuilder,
    private componentsService: DynamicFormComponentsService,
    private state: FormStateService,
  ) {}

  contructForm(
    { fields, values, locales, changes }: DynamicFormOptionsFieldChanges,
    previousValues: FormValues,
  ): FormGroup {
    this.localize = locales && locales.length > 0;
    this.locales = locales;

    const mergedValues = this.mergeValues(values, previousValues, changes);
    const formControls = this.formControlsFactory(
      fields as FieldTemplate[],
      mergedValues,
    );
    const form = this.fb.group(formControls);
    return form;
  }

  private mergeValues(
    inputValues?: FormValues, // Values from input
    previousValues?: FormValues, // Old form values before rebuild
    changes?: DynamicFormOptionsFieldChangesDistinct,
  ): FormValues {
    const valueMergeStrategy = this.state.options.valueMergeStrategy;
    const valueMergeStrategyOn = this.state.options.valueMergeStrategyOn;

    if (!previousValues || Object.keys(previousValues).length < 1) {
      return inputValues || null;
    }

    // Never update values
    if (
      valueMergeStrategyOn === ValueMergeStrategyOn.NEVER ||
      valueMergeStrategy === ValueMergeStrategy.KEEP
    ) {
      return previousValues;
    }

    // Values are not changed
    if (
      valueMergeStrategyOn === ValueMergeStrategyOn.INITIAL_VALUE_CHANGE &&
      !changes.values
    ) {
      return previousValues;
    }

    switch (valueMergeStrategy) {
      case ValueMergeStrategy.CLEAR:
        return inputValues;

      case ValueMergeStrategy.MERGE_WITH_CURRENT:
        return this.objectMerger(previousValues, inputValues);

      case ValueMergeStrategy.MERGE_WITH_INITIAL:
        return this.objectMerger(inputValues, previousValues);

      default:
        return previousValues;
    }
  }

  private objectMerger(root: AppObject, replacer: AppObject) {
    if (!replacer) {
      return root;
    }
    if (!root) {
      return replacer;
    }

    if (typeof root !== 'object' || typeof replacer !== 'object') {
      return root;
    }

    if (Array.isArray(root)) {
      if (Array.isArray(replacer)) {
        return root.map((item, i) => this.objectMerger(item, replacer[i]));
      }
      return root;
    }

    // Replacer is array when root is not
    if (Array.isArray(replacer)) {
      return root;
    }

    const rootWithNewValues = { ...replacer, ...root };

    return Object.entries(rootWithNewValues).reduce((acc, [key, rootValue]) => {
      const replacerValue = replacer[key];
      if (!replacerValue) {
        return { ...acc, [key]: rootValue };
      }

      if (!rootValue) {
        return { ...acc, [key]: replacerValue };
      }

      if (typeof rootValue === 'object' || typeof replacerValue === 'object') {
        const merged = this.objectMerger(rootValue, replacerValue);
        return { ...acc, [key]: merged };
      }

      return { ...acc, [key]: replacerValue };
    }, {});
  }

  public formControlsFactory(
    fields: FieldTemplate[],
    values?: FormValues,
  ): { [key: string]: AbstractControl } {
    return fields.reduce((acc, field) => {
      const { type } = field;

      const fieldConfig = this.componentsService.getComponentConfig(type);

      if (!fieldConfig || fieldConfig.type === 'visual') {
        if (!fieldConfig) {
          console.warn('Invalid field type (not registered)', { type });
        }
        return acc;
      }

      const value = this.getValueForField(field, values);

      /* Localize */

      if (this.localize && field.localize) {
        const localizedFields = this.locales.map(({ key, title }) => {
          return {
            ...field,
            key,
            title,
            wasLocalized: true,
            localize: false,
          };
        });

        const controls = this.formControlsFactory(
          localizedFields as FieldTemplate[],
          value,
        );

        return {
          ...acc,
          [field.key]: this.fb.group(controls),
        };
      }

      /* End  */

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
    { key, defaultValue, wasLocalized }: FieldTemplate,
    values?: any,
  ) {
    if (!values || !key) {
      return null;
    }

    if (typeof values === 'object') {
      if (values[key]) {
        return values[key];
      }
    }

    if (defaultValue) {
      return defaultValue;
    }

    if (wasLocalized) {
      const defaultLocale = this.locales.find((locale) => locale.default);
      if (key === defaultLocale.key) {
        return values;
      }
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
    { defaultValidators }: DynamicFormFieldComponentConfig,
  ): [ValidatorFn[], AsyncValidatorFn[]] {
    const validators: ValidatorFn[] = defaultValidators
      ? [...defaultValidators]
      : [];
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
    if (isDefined(validation.min)) {
      validators.push(Validators.min(validation.min));
    }
    if (isDefined(validation.max)) {
      validators.push(Validators.max(validation.max));
    }

    /* Length */
    if (isDefined(validation.minLength)) {
      const validatorFn = this.createValidatorFn<any[]>(
        (value) => value.length >= validation.minLength,
        'minLength',
      );
      validators.push(validatorFn);
    }
    if (isDefined(validation.maxLength)) {
      const validatorFn = this.createValidatorFn<any[]>(
        (value) => value.length <= validation.maxLength,
        'maxLength',
      );
      validators.push(validatorFn);
    }

    /* Items */
    if (isDefined(validation.minItems)) {
      const validatorFn = this.createValidatorFn<any[]>(
        (value) => Array.isArray(value) && value.length >= validation.minItems,
        'minItems',
      );
      validators.push(validatorFn);
    }
    if (isDefined(validation.maxItems)) {
      const validatorFn = this.createValidatorFn<any[]>(
        (value) => Array.isArray(value) && value.length <= validation.maxItems,
        'maxItems',
      );
      validators.push(validatorFn);
    }

    /* Pattern */
    if (isDefined(validation.pattern)) {
      validators.push(Validators.pattern(validation.pattern));
    }
    if (isDefined(validation.patterns)) {
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

      const showField =
        typeof condition.values === 'boolean'
          ? condition.values === parentValue
          : condition.values.includes(parentValue);

      if (showField) {
        const valid = !!control.value;
        if (valid) {
          return null;
        }
        return { conditionalRequired: true };
      }

      return null;
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
