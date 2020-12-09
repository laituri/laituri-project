import { FieldOption, FormFieldBase } from '../dynamic-form.types';

export interface RadioField extends FormFieldBase<string[]> {
  type: 'radio';
  options: FieldOption[];
}
