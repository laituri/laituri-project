import { DynamicFormFieldComponentConfig } from '../../dynamic-form.types';
import { TextareaComponent } from './textarea.component';

export const TextareaComponentConfig: DynamicFormFieldComponentConfig = {
  key: 'textarea',
  component: TextareaComponent,
  type: 'formField',
};

export const TextareaMarkdownEditorComponentConfig: DynamicFormFieldComponentConfig =
  {
    key: 'markdown-editor',
    component: TextareaComponent,
    type: 'formField',
    deprecatedWarning:
      'Type "markdown-editor" is currently replaced with "textarea" since Quill was removed!',
  };

export const TextareaMarkdownEditorComponentAsMarkdownConfig: DynamicFormFieldComponentConfig =
  {
    key: 'markdown',
    component: TextareaComponent,
    type: 'formField',
    deprecatedWarning: 'type "markdown" is replaced by "markdown-editor"',
  };
