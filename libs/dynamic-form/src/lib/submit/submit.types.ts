import { AbstractControl } from '@angular/forms';
import { FormFieldBase } from '../dynamic-form.types';

export interface SubmitField extends FormFieldBase<string> {
  type: 'submit';
  button: string;
  alwaysEnabled: true;
  events: {
    submit: (form: AbstractControl) => Promise<any>;
    error: (form: AbstractControl) => Promise<any>;
  };
}
