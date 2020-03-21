import { Input } from '@angular/core';
import { FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicFormService } from './dynamic-form.service';
export class DynamicFormBase {
  @Input()
  values: Observable<{ [key: string]: any }>;
  @Input()
  childFields: Field[];
  @Input()
  localize: boolean;
  @Input()
  locales: locale[];

  constructor(public formService: DynamicFormService) {}

  public getControl(
    form: FormGroup | FormArray,
    field: Field,
    index?: number,
  ): AbstractControl {
    return this.formService.getControl(form, field, this.localize, index);
  }

  public contructForm(
    fields: Field[],
    values?: any,
    root?: boolean,
  ): FormGroup {
    return this.formService.contructForm(fields, values, this.localize, root);
  }

  public getValue(field: Field, values: { [key: string]: any }): any {
    return this.formService.getValue(field, values, this.localize);
  }
}
