import { FieldBase } from '../../dynamic-form.types';

export interface MarkdownTextSectionField extends FieldBase {
  type: 'markdown-text-section';
  body: string;
}
