import { DynamicFormFieldComponentConfig } from '../../dynamic-form.types';
import { FileComponent } from './file.component';

export const FileComponentConfig: DynamicFormFieldComponentConfig = {
  key: 'file',
  component: FileComponent,
  type: 'formField',
};
