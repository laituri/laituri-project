import { AbstractControl } from '@angular/forms';

export type TextFieldTypes =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'password'
  | 'search'
  | 'url';

export type FieldTypes =
  | TextFieldTypes
  | 'textarea'
  | 'markdown'
  | 'dropdown'
  | 'checkbox'
  | 'checkbox-group'
  | 'group'
  | 'container'
  | 'info'
  | 'repeater'
  | 'relation'
  | 'date'
  | 'radio'
  | 'color'
  | 'chips'
  | 'file'
  | 'action'
  | string;

export type SubFields = Field[] | (() => Field[]);

export type FormField =
  | TextField
  | TextareaField
  | MarkdownField
  | DropdownField
  | GroupField
  | RepeaterField
  | RadioField
  | RelationField
  | CheckboxField
  | ActionField
  | ColorField
  | DateField
  | ChipsField
  | FileField
  | CheckboxGroupField;

export type DisplayField = InfoField | ContainerField;

export type Field = DisplayField | FormField;

export interface DynamicFormConfig {
  fields: Field[];
  values?: { [key: string]: any };
  // form?: any;
  locales?: string[];
}

export interface FieldBase {
  title?: string;
  type: FieldTypes;
  style?: FieldStyleBase;
  validation?: FieldValidationBase;
  condition?: FieldConditionValue;
}

export interface FormFieldBase<T> extends FieldBase {
  key: string;
  description?: string;
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
  description?: string;
  hidden?: boolean;
  data?: any;
}

/* Fields */

export interface TextField extends FormFieldBase<string | number> {
  type: TextFieldTypes;
  validation?: FieldValidationText | FieldValidationNumber;
}
export interface TextareaField extends FormFieldBase<string> {
  type: 'textarea';
  layout?: 'textarea' | 'editable-div';
  rows?: number;
  validation?: FieldValidationText;
}

export type HeadingSizes = 1 | 2 | 3 | 4 | 5 | 6;

export interface MarkdownElements {
  headings?: HeadingSizes[];
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  blockquote?: boolean;
  code?: boolean;
  lists?: {
    ordered?: boolean;
    bullet?: boolean;
  };
}

export interface MarkdownField extends FormFieldBase<string> {
  type: 'markdown';
  elements?: MarkdownElements;
  validation?: FieldValidationText;
  events?: {
    getImageUrl?: (value: any) => string;
  };
}
export interface FileField extends FormFieldBase<any> {
  type: 'file';
  output: 'file' | 'data';
  multiple?: boolean;
  accept?: string;
  preview?: {
    type: 'string' | 'string-array' | 'object' | 'object-array';
    isImage?: boolean;
    urlKey?: string;
  };
  events?: {
    drop?: (files: File[]) => Promise<any>;
  };
}
export interface ActionField extends FormFieldBase<string> {
  type: 'action';
  attributes?: any;
  button: string;
  preview: ActionFieldLayouts;
  events: {
    click: (prev: any, form: AbstractControl, attributes: any) => Promise<any>;
  };
}

export interface ActionFieldKeys {
  urlKey?: string;
  textKey?: string;
  imageKey?: string;
  titleKey?: string;
  idKey?: string;
  descriptionKey?: string;
}

export type ActionFieldLayouts =
  | ActionFieldButtonOnly
  | ActionFieldTextPreview
  | ActionFieldInputPreview
  | ActionFieldLinkPreview
  | ActionFieldImagePreview
  | ActionFieldCardPreview;

export interface ActionFieldTextPreview {
  layout: 'text';
  textKey: string;
}
export interface ActionFieldButtonOnly {
  layout: 'button';
}
export interface ActionFieldInputPreview {
  layout: 'input';
  textKey: string;
}
export interface ActionFieldLinkPreview {
  layout: 'link';
  urlKey: string;
}
export interface ActionFieldImagePreview {
  layout: 'image';
  imageKey: string;
}
export interface ActionFieldCardPreview {
  layout: 'card';
  titleKey: string;
  idKey?: string;
  descriptionKey?: string;
  imageKey?: string;
}

export interface DropdownField extends FormFieldBase<string> {
  type: 'dropdown';
  multiple?: boolean;
  output?: 'key' | 'data' | 'boolean-map';
  display?: 'input-only' | 'chips';
  options: FieldOption[];
  validation?: FieldValidationBase | FieldValidationArray;
}

export interface GroupField extends FormFieldBase<object> {
  type: 'group';
  flat?: boolean;
  fields: SubFields;
  style?: ContainerFieldStyle;
}
export interface ContainerField extends FieldBase {
  type: 'container';
  fields: SubFields;
  style?: ContainerFieldStyle;
}

/* Check me */
export interface ContainerFieldStyle extends FieldStyleBase {
  direction?: 'column' | 'row';

  wrap?: boolean;
}

export interface RepeaterField extends FormFieldBase<object[]> {
  type: 'repeater';
  fields: SubFields;
  display?: string;
  collapsed?: boolean;
  validation?: FieldValidationArray;
}

export interface CheckboxField extends FormFieldBase<boolean> {
  type: 'checkbox';
  title: string;
}
export interface CheckboxGroupField extends FormFieldBase<string[]> {
  type: 'checkbox-group';
  output?: 'key' | 'data' | 'boolean-map';
  options: FieldOption[];
  validation?: FieldValidationBase | FieldValidationArray;
}
export interface RadioField extends FormFieldBase<string[]> {
  type: 'radio';
  options: FieldOption[];
}
export interface ColorField extends FormFieldBase<string> {
  type: 'color';
  output: 'hex' | 'rgba';
  swatches?: string[];
  opacity?: boolean;
}
export interface ChipsField extends FormFieldBase<string[]> {
  type: 'chips';
  allowDuplicates?: boolean;
  validation?: FieldValidationArray;
}

export interface ChipItem {
  key: string | number;
  title: string;
}
export interface DateField extends FormFieldBase<string> {
  type: 'date';
  output?: string;
  display?: string;
}

export interface RelationItem {
  key: string;
  title: string;
  typeName?: string;
}
export interface RelationField extends FormFieldBase<string[]> {
  type: 'relation';
  items: RelationItem[];
  actions?: {
    loadmore: () => void;
  };
}

export interface InfoField extends FieldBase {
  type: 'info';
  body: string;
}
