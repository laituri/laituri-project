import { ComponentType } from '@angular/cdk/portal';
import { TemplateRef } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';

export interface DynamicFormOptions<T = FormValues> {
  fields: Field[];
  values?: T;
  locales?: Locale[];
  disabled?: boolean;
  errorMessages?: ErrorMessages;
  disableFormOnSubmit?: boolean;
}

export type FieldTypes = string;

export type SubFields = Field[];

export type Field = any;

export type FormValues = { [key: string]: any };

interface Localize<T> {
  [localeKey: string]: T;
}

export type LocalizedValue<T = string> = T | Localize<T>;

export type LocalizedString = LocalizedValue<string>;
export type LocalizedNumber = LocalizedValue<number>;

export interface Locale {
  key: string;
  title: string;
  default?: boolean;
}

export interface FieldBase {
  title?: string;
  description?: string;
  type: FieldTypes;
  style?: FieldStyleBase;
  validation?: FieldValidationBase;
  condition?: FieldConditionValue;
  info?: FieldInfo;
}

export interface FormFieldBase<T> extends FieldBase {
  key: string;
  description?: string;
  descriptionTemplate?: TemplateRef<any>;
  placeholder?: LocalizedString;
  hint?: LocalizedString;
  disabled?: boolean;
  hidden?: boolean;
  defaultValue?: T;
}

export interface FieldTemplate extends FormFieldBase<any> {
  validation?: FieldValidationTemplate;
  /* Advanced */
  localize?: boolean;
  wasLocalized?: boolean;
  /* Functions */
  asyncCondition?: (form?: any) => any;
  fields?: SubFields;
  output?: string;
  options?: FieldOption[];
  flat?: boolean;
  id?: string;
  classNames?: string[];
}

/* Check me */
export interface FieldStyleBase {
  grow?: number;
  className?: string;
  id?: string;
  css?: string;
}

export interface FieldInfo {
  body: string;
}

export interface FieldConditionValue {
  key: string;
  objectKey?: string;
  values?: any[] | boolean;
  fromParent?: boolean;
}

export interface FieldValidationBase {
  required?: boolean;
  pattern?: string;
  patterns?: { [key: string]: string };
  errorMessages?: { [key: string]: string };
}
export interface FieldValidationArray extends FieldValidationBase {
  minItems?: number;
  maxItems?: number;
}
export interface FieldValidationText extends FieldValidationBase {
  minLength?: any;
  maxLength?: any;
}
export interface FieldValidationNumber extends FieldValidationBase {
  min?: any;
  max?: any;
}

export interface ErrorMessages {
  [key: string]: string;
}

export interface FieldValidationTemplate
  extends FieldValidationArray,
    FieldValidationText,
    FieldValidationNumber {}
export interface FieldOption {
  title: string;
  key: string;
  classNames?: string[];
  value?: any;
  data?: any; // Clean up this
  description?: string;
  hidden?: boolean;
}

export interface DynamicFormFieldComponentConfig {
  key: string;
  component: ComponentType<any>;
  type: 'formField' | 'visual' | 'formGroup' | 'flatGroup' | 'formArray';
  defaultValidators?: ValidatorFn[];
  deprecatedWarning?: string;
}

/* Fields */

type ObjectKeys<Type, Value> = { [Key in keyof Partial<Type>]: Value };

type KeysArray<T> = (keyof T)[];
