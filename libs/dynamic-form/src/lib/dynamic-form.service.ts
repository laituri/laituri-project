import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  AbstractControl,
  ValidatorFn,
  AsyncValidatorFn,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { Observable, BehaviorSubject, fromEvent, combineLatest } from 'rxjs';
import {
  first,
  map,
  mergeMap,
  filter,
  tap,
  debounceTime,
} from 'rxjs/operators';
import {
  FieldTemplate,
  DynamicFormConfig,
  FieldOption,
  FieldConditionValue,
} from './dynamic-form.types';

const relationFieldTemplates: FieldTemplate[] = [
  {
    key: 'type',
    title: '',
    type: 'text',
    value: 'relation',
  },
  {
    title: '',
    key: 'key',
    type: 'text',
  },
];

@Injectable()
export class DynamicFormService {
  private form: FormGroup;
  private locales: string[];

  private history = [];
  private checkedIndex = -1;
  private currentIndex = -1;

  init({ fields, values, locales }: DynamicFormConfig): FormGroup {
    if (!this.form) {
      const localize = locales && locales.length > 0;
      this.form = this.contructForm(
        fields as FieldTemplate[],
        values,
        localize,
        true,
      );
    } else {
      const current = this.form.value;
      const merged = { ...current, ...values };
      this.form.setValue(merged);
    }
    return this.form;
  }

  startHistory() {
    return combineLatest([
      fromEvent(document, 'keydown').pipe(
        tap((e: KeyboardEvent) => {
          if (e.code === 'KeyZ' && e.ctrlKey && !e.shiftKey) {
            this.undo();
          }
          if (e.code === 'KeyZ' && e.ctrlKey && e.shiftKey) {
            this.redo();
          }
        }),
      ),
      this.form.valueChanges.pipe(
        debounceTime(420),
        mergeMap((values) => {
          if (this.checkedIndex !== this.currentIndex) {
            this.checkedIndex = this.currentIndex;
          } else {
            const newIndex = this.currentIndex + 1;
            this.history[newIndex] = values;
            this.history = this.history.slice(0, newIndex + 1);
            this.checkedIndex = newIndex;
            this.currentIndex = newIndex;
          }
          return this.history;
        }),
      ),
    ]).subscribe();
  }

  undo() {
    if (this.currentIndex - 1 > -1) {
      const previous = this.history[this.currentIndex - 1];
      this.form.setValue(previous);
      this.currentIndex -= 1;
    }
  }

  redo() {
    if (this.currentIndex + 1 < this.history.length) {
      const next = this.history[this.currentIndex + 1];
      this.form.setValue(next);
      this.currentIndex += 1;
    }
  }

  getForm() {
    return this.form;
  }

  constructor(private fb: FormBuilder) {}

  public getControl(
    form: FormGroup | FormArray,
    field: FieldTemplate,
    localize?: boolean,
    index?: number,
  ): AbstractControl {
    if (localize) {
      const locale = field.localize ? 'en-US' : 'common';
      if (index) {
        const group = form.controls[locale].controls[index] as FormGroup;
        return group.controls[field.key];
      }
      return form.controls[locale].controls[field.key];
    }
    if (index) {
      const group = form.controls[index] as FormGroup;
      return group.controls[field.key];
    }

    if (!form.controls) {
      return form;
    }
    if (field.type === 'container' || field.flat) {
      return form;
    }

    try {
      return form.controls[field.key];
    } catch (error) {
      return form;
    }
  }

  public contructForm(
    fields: FieldTemplate[],
    values?: any,
    localize?: boolean,
    root?: boolean,
  ): FormGroup {
    if (root && localize) {
      const locales = this.locales;
      return this.fb.group({
        common: this.contructForm(
          fields.filter((f) => !f.localize),
          values,
          localize,
        ),
        ...locales.reduce((acc, cur) => {
          acc[cur] = this.contructForm(
            fields.filter((f) => f.localize),
            values,
            localize,
          );
          return acc;
        }, {}),
      });
    }

    return this.fb.group(
      fields.reduce((acc, field) => {
        const value = this.getValue(field, values, localize);
        const validators = this._getValidators(field);
        if (field.type === 'info') {
          return acc;
        }
        if (field.type === 'repeater') {
          const [validation, asyncValidation] = validators;
          return {
            ...acc,
            [field.key]: value
              ? this.fb.array(
                  value.map((val) => {
                    const childFieldTemplates =
                      typeof field.fields === 'function'
                        ? field.fields()
                        : field.fields;
                    return this.contructForm(
                      childFieldTemplates as FieldTemplate[],
                      val,
                    );
                  }),
                  validation,
                  asyncValidation,
                )
              : this.fb.array([], validation, asyncValidation),
          };
        }
        if (field.type === 'group' || field.type === 'container') {
          const childFieldTemplates =
            typeof field.fields === 'function' ? field.fields() : field.fields;
          const group = this.contructForm(
            childFieldTemplates as FieldTemplate[],
            value,
          );
          if (field.flat || field.type === 'container') {
            return {
              ...acc,
              ...group.controls,
            };
          }
          return {
            ...acc,
            [field.key]: group,
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
        if (field.type === 'relation') {
          const group = this.contructForm(relationFieldTemplates, value);
          return {
            ...acc,
            [field.key]: group,
          };
        }
        const control = [value || field.defaultValue, ...validators];
        return { ...acc, [field.key]: control };
      }, {}),
    );
  }

  private contructControlFromOptions(
    options: FieldOption[],
    values: { [key: string]: boolean },
  ) {
    const controls = options.reduce((acc, option) => {
      const value = values ? values[option.key] : false;
      return { ...acc, [option.key]: [value || false] };
    }, {});
    const g = this.fb.group(controls);
    return g;
  }

  public getValue(
    field: FieldTemplate,
    values: { [key: string]: any },
    localize?: boolean,
  ): any {
    const value = field.value || field.defaultValue || null;
    if (values) {
      if (field.localize) {
        return values['en-US'][field.key] || value;
      }
      const path = localize && values.common ? values.common : values;
      if (path && path[field.key]) {
        return path[field.key] || value;
      }
    }
    switch (field.output) {
      case 'boolean-map':
        return value || {};

      default:
        break;
    }
    /*     switch (field.type) {
      case 'number':
        return value || 0;

      default:
        break;
    } */
    return value;
  }

  private _getValidators({
    type,
    validation,
    condition,
    asyncCondition,
    output,
  }: FieldTemplate): [ValidatorFn[], AsyncValidatorFn[]] {
    const validators: ValidatorFn[] = [];
    const asyncValidators: AsyncValidatorFn[] = [];
    /* From type */
    if (type === 'email') {
      validators.push(Validators.email);
    }
    if (type === 'tel') {
      validators.push(Validators.minLength(5));
    }
    if (type === 'number') {
      validators.push(this._numberValidation());
    }
    if (type === 'url') {
      validators.push(
        Validators.pattern(
          '(http|https)://(w+:{0,1}w*@)?(S+)(:[0-9]+)?(/|/([w#!:.?+=&%@!-/]))?',
        ),
      );
    }
    if (type === 'color') {
      switch (output) {
        case 'rgba':
          validators.push(
            Validators.pattern(
              '^(rgba)\\((\\s?\\d{1,3},){3}\\s?\\d(\\.\\d+)*\\)',
            ),
          );
          break;

        default:
          validators.push(Validators.pattern('^#([\\w\\d]{3,8})'));
          break;
      }
    }

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

    if (validation.min) {
      validators.push(Validators.min(validation.min));
    }
    if (validation.max) {
      validators.push(Validators.max(validation.max));
    }
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

  private requiredIf(
    group: FormGroup,
    parent: FieldConditionValue,
    asyncCondition: (form: FormGroup) => Observable<boolean>,
    control: AbstractControl,
  ) {
    console.log([1, group, 2, parent, 3, asyncCondition, 4, control]);

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

  private _numberValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      // tslint:disable-next-line: triple-equals
      if (!Number(control.value) && control.value != 0) {
        return { number: 'Value is not a number' };
      }
      // Transform number string to a real number
      if (typeof control.value !== 'number') {
        control.setValue(Number(control.value));
        return null;
      }
      return null;
    };
  }
}
