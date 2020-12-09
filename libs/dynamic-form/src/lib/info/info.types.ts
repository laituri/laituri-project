import { FieldBase } from '../dynamic-form.types';

export interface InfoField extends FieldBase {
  type: 'info';
  body: string;
}
