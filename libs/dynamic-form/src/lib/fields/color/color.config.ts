import { Validators } from '@angular/forms';
import { DynamicFormFieldComponentConfig } from '../../dynamic-form.types';
import { ColorComponent } from './color.component';

export const ColorComponentConfig: DynamicFormFieldComponentConfig = {
  key: 'color',
  component: ColorComponent,
  type: 'formField',
  defaultValidators: [
    Validators.pattern(
      '^(rgba)\\((\\s?\\d{1,3},){3}\\s?\\d(\\.\\d+)*\\)|^#([\\w\\d]{3,8})',
    ),
  ],
};
