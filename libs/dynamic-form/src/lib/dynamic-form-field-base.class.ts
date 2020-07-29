import { Input, HostBinding, Directive } from '@angular/core';

@Directive()
export class DynamicFormFieldBase {
  @Input()
  field: Field;

  @HostBinding('style.flex-grow') get grow() {
    return this.field.style && this.field.style.grow;
  }
  @HostBinding('class') get className() {
    return this.field.style && this.field.style.className;
  }
  @HostBinding('style') get css() {
    return this.field.style && this.field.style.css;
  }
}
