import { FieldValidationText, FormFieldBase } from '../../dynamic-form.types';

export type HeadingSizes = 1 | 2 | 3 | 4 | 5 | 6;

export interface MarkdownEditorElements {
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

export interface MarkdownEditorField extends FormFieldBase<string> {
  type: 'markdown-editor';
  elements?: MarkdownEditorElements;
  validation?: FieldValidationText;
  events?: {
    getImageUrl?: (value: any) => Promise<string>;
  };
}
