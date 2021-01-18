import { ComponentType } from '@angular/cdk/portal';
import { TemplateRef } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

export interface DynamicFormInputs {
  fields: Field[];
  values?: FormValues;
  locales?: string[];
  disabled?: boolean;
}

export type FieldTypes = string;

export type SubFields = Field[];

export type Field = any;

export type FormValues = { [key: string]: any };

export interface DynamicFormConfig {
  fields: Field[];
  values?: { [key: string]: any };
  // form?: any;
  locales?: string[];
}

export interface FieldBase {
  title?: string;
  description?: string;
  type: FieldTypes;
  style?: FieldStyleBase;
  validation?: FieldValidationBase;
  condition?: FieldConditionValue;
  info: FieldInfo;
}

export interface FormFieldBase<T> extends FieldBase {
  key: string;
  description?: string;
  descriptionTemplate?: TemplateRef<any>;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  hidden?: boolean;
  value?: T;
  defaultValue?: T;
}

export interface FieldTemplate extends FormFieldBase<any> {
  validation?: FieldValidationTemplate;
  /* Advanced */
  localize?: boolean;
  /* Functions */
  asyncCondition?: (form?: any) => any;
  fields?: SubFields;
  output?: string;
  options?: FieldOption[];
  flat?: boolean;
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
  icon?: string;
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

export interface FieldValidationTemplate
  extends FieldValidationArray,
    FieldValidationText,
    FieldValidationNumber {}
export interface FieldOption {
  title: string;
  key: string;
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
