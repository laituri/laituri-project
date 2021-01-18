import { DynamicFormFieldComponentConfig } from '../../dynamic-form.types';
import { MarkdownEditorComponent } from './markdown-editor.component';

export const MarkdownEditorComponentConfig: DynamicFormFieldComponentConfig = {
  key: 'markdown-editor',
  component: MarkdownEditorComponent,
  type: 'formField',
  deprecatedWarning:
    '"markdown-editor" will be moved to a new package "@laituri/dynamic-form-markdown-editor" in a future release!',
};

export const MarkdownEditorComponentAsMarkdownConfig: DynamicFormFieldComponentConfig = {
  key: 'markdown',
  component: MarkdownEditorComponent,
  type: 'formField',
  deprecatedWarning: 'type "markdown" is replaced by "markdown-editor"',
};
