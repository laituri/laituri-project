import { Directive, HostBinding, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Field } from '../../dynamic-form.types';
import { isRequired } from '../helpers/required';

@Directive({
  selector: '[dyna-label]',
})
export class DynaLabelDirective {
  @Input() control: AbstractControl;
  @Input() field: Field;

  constructor() {}

  @HostBinding('class.dyna-label') dynaLLabelClass = true;
  @HostBinding('class.required') get required() {
    return isRequired(this.field);
  }
  @HostBinding('class.valid') get valid() {
    return this.control && this.control.valid;
  }
  @HostBinding('class.invalid') get invalid() {
    return this.control && this.control.invalid;
  }
}
