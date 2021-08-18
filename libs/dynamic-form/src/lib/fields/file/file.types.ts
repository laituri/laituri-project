import { FieldValidationBase, FormFieldBase } from '../../dynamic-form.types';

export interface FileField extends FormFieldBase<any> {
  type: 'file';
  output: 'file' | 'data';
  previewHint?: string;
  multiple?: boolean;
  preview?: {
    type: 'string' | 'string-array' | 'object' | 'object-array';
    isImage?: boolean;
    urlKey?: string;
  };
  events?: {
    drop?: (files: File[]) => Promise<any>;
  };
  validation?: FileValidation;
}

interface FileValidation extends FieldValidationBase {
  accept?: string;
  minSize?: number;
  maxSize?: number;
  // for images
  minHeight?: number;
  minWidth?: number;
  maxHeight?: number;
  maxWidth?: number;
}
