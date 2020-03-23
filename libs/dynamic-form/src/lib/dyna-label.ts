import { Directive, HostBinding, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[dyna-label]',
})
export class DynaLabelDirective {
  @Input() control: AbstractControl;
  @Input() field: Field;
  constructor() {}
  @HostBinding('class.dyna-label') label = true;
  @HostBinding('class.required') get required() {
    return (
      this.field && this.field.validation && this.field.validation.required
    );
  }
  @HostBinding('class.valid') get valid() {
    return this.control && this.control.valid;
  }
  @HostBinding('class.invalid') get invalid() {
    return this.control && this.control.invalid;
  }
}
