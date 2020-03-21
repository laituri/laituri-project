import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  AbstractControl,
  ValidatorFn,
  AsyncValidatorFn,
  Validators,
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

const relationFields: Field[] = [
  {
    key: 'type',
    type: 'text',
    value: 'relation',
  },
  {
    key: 'key',
    type: 'text',
  },
];

@Injectable()
export class DynamicFormService {
  private form: FormGroup;
  private locales: locale[];
  private childFields: Field[];

  private history = [];
  private checkedIndex = -1;
  private currentIndex = -1;

  init({
    form,
    fields,
    values,
    childFields,
    locales,
    localize,
  }: FormConfig): FormGroup {
    this.locales = locales || [];
    this.childFields = childFields || [];
    if (!form) {
      this.form = form || this.contructForm(fields, values, localize, true);
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
        mergeMap(values => {
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
    field: Field,
    localize?: boolean,
    index?: number,
  ): AbstractControl {
    if (localize) {
      const locale = field.localisation ? 'en-US' : 'common';
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

    return form.controls[field.key];
  }

  public contructForm(
    fields: Field[],
    values?: any,
    localize?: boolean,
    root?: boolean,
  ): FormGroup {
    if (root && localize) {
      const locales = this.locales;
      return this.fb.group({
        common: this.contructForm(
          fields.filter(f => !f.localisation),
          values,
          localize,
        ),
        ...locales.reduce((acc, cur) => {
          acc[cur] = this.contructForm(
            fields.filter(f => f.localisation),
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
        if (field.type === 'repeater') {
          return {
            ...acc,
            [field.key]: value
              ? this.fb.array(
                  value.map(val =>
                    this.contructForm(field.fields || this.childFields, val),
                  ),
                )
              : this.fb.array([]),
          };
        }
        if (field.type === 'map') {
          const group = this.contructForm(field.fields, value);
          return {
            ...acc,
            [field.key]: group,
          };
        }
        if (field.type === 'relation') {
          const group = this.contructForm(relationFields, value);
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

  public getValue(
    { key, type, localisation, value, defaultValue }: Field,
    values: { [key: string]: any },
    localize?: boolean,
  ): any {
    if (!values) {
      return value || defaultValue;
    }
    if (localisation) {
      return values['en-US'][key] || value || defaultValue;
    }
    const path = localize && values.common ? values.common : values;
    if (path && path[key]) {
      return path[key] || value || defaultValue;
    }
    switch (type) {
      case 'repeater':
        return [] || value || defaultValue;
      case 'checkbox-group':
        return [] || value || defaultValue;

      default:
        return value || defaultValue || '';
    }
  }

  private _getValidators({
    type,
    validation,
    parent,
    asyncCondition,
  }: Field): [ValidatorFn[], AsyncValidatorFn[]] {
    const validators: ValidatorFn[] = [];
    const asyncValidators: AsyncValidatorFn[] = [];
    /* From type */
    if (type === 'email') {
      validators.push(Validators.email);
    }
    if (type === 'url') {
      validators.push(
        Validators.pattern(
          '(http|https)://(w+:{0,1}w*@)?(S+)(:[0-9]+)?(/|/([w#!:.?+=&%@!-/]))?',
        ),
      );
    }

    if (!validation) {
      return [validators, asyncValidators];
    }

    /* From validators */
    if (validation.required) {
      if (parent || asyncCondition) {
        asyncValidators.push(
          this.requiredIf.bind(this, parent, asyncCondition),
        );
      } else {
        validators.push(Validators.required);
      }
    }
    if (type === 'tel') {
      validators.push(Validators.minLength(5));
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
    parent: FieldParent,
    asyncCondition: (form: FormGroup) => Observable<boolean>,
    control: AbstractControl,
  ) {
    if (asyncCondition) {
      const conditionValue = asyncCondition(group)
        .pipe(first())
        .toPromise();
      const validation = conditionValue ? { conditionalRequired: true } : null;
      return new Promise(resolve => resolve(validation));
    }
    if (parent) {
      const parentControl = group.get(parent.key);
      if (!parentControl) {
        return new Promise(resolve => resolve(null));
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
      return new Promise(resolve => resolve(validation));
    }

    return new Promise(resolve => resolve(null));
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
