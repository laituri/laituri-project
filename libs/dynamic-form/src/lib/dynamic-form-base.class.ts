import { Input, Directive } from '@angular/core';
import { FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicFormFieldBase } from './dynamic-form-field-base.class';
import { FieldTemplate } from './dynamic-form.types';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class DynamicFormBase extends DynamicFormFieldBase {
  @Input()
  values: Observable<{ [key: string]: any }>;
  @Input()
  childFields: FieldTemplate[];
  @Input()
  localize: boolean;
  @Input()
  locales: string[];

  public getControl(
    form: FormGroup | FormArray,
    field: FieldTemplate,
    index?: number,
  ): AbstractControl {
    if (this.localize) {
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

  /*   public getValue(field: FieldTemplate, values: { [key: string]: any }): any {
    return this.formService.getValue(field, values, this.localize);
  } */
}
