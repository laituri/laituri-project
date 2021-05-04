import { FormFieldBase } from '../../dynamic-form.types';

export interface DateField extends FormFieldBase<string> {
  type: 'date';
  output?: string;
  display?: string;
}
