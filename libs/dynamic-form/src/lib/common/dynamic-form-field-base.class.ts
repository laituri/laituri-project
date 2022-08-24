import { Input, HostBinding, Directive } from '@angular/core';
import { UntypedFormGroup, AbstractControl } from '@angular/forms';
import { hasValue, isValid } from './helpers/valid';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class DynamicFormFieldBase {
  @Input()
  field: any;
  @Input()
  control: AbstractControl | UntypedFormGroup;
  @HostBinding('class.valid') get validClass() {
    return isValid(this.control);
  }
  @HostBinding('class.has-value') get hasValueClass() {
    return hasValue(this.control);
  }
}
