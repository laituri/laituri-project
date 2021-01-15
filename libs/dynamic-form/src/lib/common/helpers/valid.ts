import { AbstractControl } from '@angular/forms';

export function isValid(control: AbstractControl) {
  if (!control) {
    return false;
  }
  return control.valid || control.disabled;
}
