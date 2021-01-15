import { FormFieldBase } from '../../dynamic-form.types';

export interface ColorField extends FormFieldBase<string> {
  type: 'color';
  output: 'hex' | 'rgba';
  swatches?: string[];
  opacity?: boolean;
}
