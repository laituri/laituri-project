import { Input, HostBinding, Directive } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Field } from './dynamic-form.types';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export class DynamicFormFieldBase {
  @Input()
  field: Field;
  @Input()
  control: AbstractControl | FormGroup;

  @HostBinding('style.flex-grow') get grow() {
    return this.field && this.field.style && this.field.style.grow;
  }
  @HostBinding('class') get className() {
    return this.field && this.field.style && this.field.style.className;
  }
  @HostBinding('id') get elementId() {
    return this.field && this.field.style && this.field.style.id;
  }
  @HostBinding('style') get css() {
    return this.field && this.field.style && this.field.style.css;
  }
  /* There might a problem with disabled thingies */
  @HostBinding('class.valid') get validClass() {
    return (
      this.control &&
      (this.control.valid || this.control.disabled) &&
      (this.control.value === false || this.control.value)
    );
  }
}
