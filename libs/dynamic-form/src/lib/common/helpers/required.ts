import { Field } from '../../dynamic-form.types';

export function isRequired(field: Field) {
  if (!field) {
    return false;
  }
  return field.validation && field.validation.required;
}
