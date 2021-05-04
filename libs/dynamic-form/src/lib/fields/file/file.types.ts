import { FormFieldBase } from '../../dynamic-form.types';

export interface FileField extends FormFieldBase<any> {
  type: 'file';
  output: 'file' | 'data';
  multiple?: boolean;
  accept?: string;
  preview?: {
    type: 'string' | 'string-array' | 'object' | 'object-array';
    isImage?: boolean;
    urlKey?: string;
  };
  events?: {
    drop?: (files: File[]) => Promise<any>;
  };
}
