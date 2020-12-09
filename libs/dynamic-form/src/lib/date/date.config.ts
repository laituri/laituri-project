import { DynamicFormFieldComponentConfig } from '../dynamic-form.types';
import { DateComponent } from './date.component';

export const DateComponentConfig: DynamicFormFieldComponentConfig = {
  key: 'date',
  component: DateComponent,
  type: 'formField',
};
