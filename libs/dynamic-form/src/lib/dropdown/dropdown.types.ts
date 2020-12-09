import {
  FieldOption,
  FieldValidationArray,
  FieldValidationBase,
  FormFieldBase,
} from '../dynamic-form.types';

export interface DropdownField extends FormFieldBase<string> {
  type: 'dropdown';
  multiple?: boolean;
  output?: 'key' | 'data' | 'boolean-map';
  display?: 'input-only' | 'chips';
  options: FieldOption[];
  validation?: FieldValidationBase | FieldValidationArray;
}
