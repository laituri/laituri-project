import { AbstractControl } from '@angular/forms';

export function isValid(control: AbstractControl) {
  if (!control) {
    return false;
  }
  return control.valid || control.disabled;
}

export function hasValue(control: AbstractControl) {
  if (!control) {
    return false;
  }
  return !!control.value;
}
