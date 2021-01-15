import { Input, HostBinding, Directive } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { isValid } from './helpers/valid';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class DynamicFormFieldBase {
  @Input()
  field: any;
  @Input()
  control: AbstractControl | FormGroup;
  @HostBinding('class.valid') get validClass() {
    return isValid(this.control);
  }
}
