import { DynamicFormFieldComponentConfig } from '../../dynamic-form.types';
import { MarkdownTextSectionComponent } from './markdown-text-section.component';

export const MarkdownTextSectionComponentConfig: DynamicFormFieldComponentConfig = {
  key: 'markdown-text-section',
  component: MarkdownTextSectionComponent,
  type: 'visual',
};

export const MarkdownTextSectionComponentAsInfoConfig: DynamicFormFieldComponentConfig = {
  key: 'info',
  component: MarkdownTextSectionComponent,
  type: 'visual',
  deprecatedWarning: 'type "info" is replaced by "markdown-text-section"',
};
