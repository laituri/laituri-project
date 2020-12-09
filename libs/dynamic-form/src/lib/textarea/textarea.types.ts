import { FieldValidationText, FormFieldBase } from '../dynamic-form.types';

export interface TextareaField extends FormFieldBase<string> {
  type: 'textarea';
  layout?: 'textarea' | 'editable-div';
  rows?: number;
  validation?: FieldValidationText;
}
