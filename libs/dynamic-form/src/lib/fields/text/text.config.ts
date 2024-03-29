import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { isDefined } from '../../common/common.helpers';
import { DynamicFormFieldComponentConfig } from '../../dynamic-form.types';
import { TextComponent } from './text.component';

export const TextComponentConfig: DynamicFormFieldComponentConfig = {
  key: 'text',
  component: TextComponent,
  type: 'formField',
};

export const EmailComponentConfig: DynamicFormFieldComponentConfig = {
  key: 'email',
  component: TextComponent,
  type: 'formField',
  defaultValidators: [Validators.email],
};

export const TelComponentConfig: DynamicFormFieldComponentConfig = {
  key: 'tel',
  component: TextComponent,
  type: 'formField',
};

export const numberValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors => {
    try {
      const value = control.value;
      if (isDefined(value) && value !== '') {
        // tslint:disable-next-line: triple-equals
        if (!Number(value) && value != 0) {
          return { number: 'Value is not a number' };
        }
        // Transform number string to a real number
        if (typeof value === 'string') {
          control.setValue(Number(value));
          return null;
        }
        // value is number
        return null;
      }
      // value is undefined
      return null;
    } catch (error) {
      console.log('Error in numberValidator:', { error });
      return null;
    }
  };
};

export const NumberComponentConfig: DynamicFormFieldComponentConfig = {
  key: 'number',
  component: TextComponent,
  type: 'formField',
  defaultValidators: [numberValidator()],
};

export const PassWordComponentConfig: DynamicFormFieldComponentConfig = {
  key: 'password',
  component: TextComponent,
  type: 'formField',
  defaultValidators: [Validators.minLength(3)],
};

export const SearchComponentConfig: DynamicFormFieldComponentConfig = {
  key: 'search',
  component: TextComponent,
  type: 'formField',
  defaultValidators: [Validators.minLength(3)],
};

export const UrlComponentConfig: DynamicFormFieldComponentConfig = {
  key: 'url',
  component: TextComponent,
  type: 'formField',
  defaultValidators: [Validators.pattern(/(^http.+)|(^\/)/)],
};

export const TextComponentConfigs = [
  TextComponentConfig,
  EmailComponentConfig,
  TelComponentConfig,
  NumberComponentConfig,
  PassWordComponentConfig,
  SearchComponentConfig,
  UrlComponentConfig,
];
