import {
  FieldValidationNumber,
  FieldValidationText,
  FormFieldBase,
} from '../../dynamic-form.types';

export interface TextField extends FormFieldBase<string | number> {
  type: TextFieldTypes;
  validation?: FieldValidationText | FieldValidationNumber;
}

export type TextFieldTypes =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'password'
  | 'search'
  | 'url';
