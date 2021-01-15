import {
  FieldBase,
  FieldStyleBase,
  FormFieldBase,
  SubFields,
} from '../../dynamic-form.types';

export interface GroupField extends FormFieldBase<object> {
  type: 'group';
  flat?: boolean;
  fields: SubFields;
  style?: ContainerFieldStyle;
}
export interface ContainerField extends FieldBase {
  type: 'container';
  fields: SubFields;
  style?: ContainerFieldStyle;
}

export interface ContainerFieldStyle extends FieldStyleBase {
  direction?: 'column' | 'row';
  wrap?: boolean;
}
