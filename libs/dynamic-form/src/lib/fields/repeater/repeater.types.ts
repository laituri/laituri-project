import {
  FieldValidationArray,
  FormFieldBase,
  SubFields,
} from '../../dynamic-form.types';

export interface RepeaterField extends FormFieldBase<object[]> {
  type: 'repeater';
  fields: SubFields;
  display?: string;
  collapsed?: boolean;
  validation?: FieldValidationArray;
}
