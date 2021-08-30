import {
  FieldOption,
  FieldValidationArray,
  FieldValidationBase,
  FormFieldBase,
} from '../../dynamic-form.types';

export interface CheckboxGroupField extends FormFieldBase<string[]> {
  type: 'checkbox-group';
  output?: 'key' | 'data' | 'boolean-map';
  selectAll?: boolean | { selectAllTitle: string; unselectAllTitle: string };
  options: FieldOption[];
  validation?: FieldValidationBase | FieldValidationArray;
}
