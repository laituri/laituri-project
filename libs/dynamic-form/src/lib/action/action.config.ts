import { DynamicFormFieldComponentConfig } from '../dynamic-form.types';
import { ActionComponent } from './action.component';

export const ActionComponentConfig: DynamicFormFieldComponentConfig = {
  key: 'action',
  component: ActionComponent,
  type: 'formField',
};
