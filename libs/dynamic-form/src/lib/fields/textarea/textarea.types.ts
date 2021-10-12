import { FieldValidationText, FormFieldBase } from '../../dynamic-form.types';

export interface TextareaField extends FormFieldBase<string> {
  type: 'textarea' | 'markdown-editor'; // use textarea as temporary markdown editor!;
  layout?: 'textarea' | 'editable-div';
  rows?: number;
  validation?: FieldValidationText;
}
