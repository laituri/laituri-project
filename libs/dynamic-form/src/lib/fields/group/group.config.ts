import { DynamicFormFieldComponentConfig } from '../../dynamic-form.types';
import { GroupComponent } from './group.component';

export const GroupComponentConfig: DynamicFormFieldComponentConfig = {
  key: 'group',
  component: GroupComponent,
  type: 'formGroup',
};

export const ContantainerComponentConfig: DynamicFormFieldComponentConfig = {
  key: 'container',
  component: GroupComponent,
  type: 'flatGroup',
};
