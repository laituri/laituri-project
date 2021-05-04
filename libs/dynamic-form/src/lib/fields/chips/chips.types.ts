import { FieldValidationArray, FormFieldBase } from '../../dynamic-form.types';

export interface ChipsField extends FormFieldBase<string[]> {
  type: 'chips';
  allowDuplicates?: boolean;
  validation?: FieldValidationArray;
}
