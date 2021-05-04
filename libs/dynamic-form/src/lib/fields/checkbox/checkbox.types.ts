import { FormFieldBase } from '../../dynamic-form.types';

export interface CheckboxField extends FormFieldBase<boolean> {
  type: 'checkbox';
  title: string;
}
