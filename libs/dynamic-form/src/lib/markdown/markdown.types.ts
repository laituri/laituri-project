import { FieldValidationText, FormFieldBase } from '../dynamic-form.types';

export type HeadingSizes = 1 | 2 | 3 | 4 | 5 | 6;

export interface MarkdownElements {
  headings?: HeadingSizes[];
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  blockquote?: boolean;
  code?: boolean;
  lists?: {
    ordered?: boolean;
    bullet?: boolean;
  };
}

export interface MarkdownField extends FormFieldBase<string> {
  type: 'markdown';
  elements?: MarkdownElements;
  validation?: FieldValidationText;
  events?: {
    getImageUrl?: (value: any) => Promise<string>;
  };
}
