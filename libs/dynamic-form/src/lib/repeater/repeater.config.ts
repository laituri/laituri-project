import { DynamicFormFieldComponentConfig } from '../dynamic-form.types';
import { RepeaterComponent } from './repeater.component';

export const RepeaterComponentConfig: DynamicFormFieldComponentConfig = {
  key: 'repeater',
  component: RepeaterComponent,
  type: 'formArray',
};
