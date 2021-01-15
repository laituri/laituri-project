import {
  FieldOption,
  FieldValidationArray,
  FieldValidationBase,
  FormFieldBase,
} from '../../dynamic-form.types';

export interface CheckboxGroupField extends FormFieldBase<string[]> {
  type: 'checkbox-group';
  output?: 'key' | 'data' | 'boolean-map';
  options: FieldOption[];
  validation?: FieldValidationBase | FieldValidationArray;
}
