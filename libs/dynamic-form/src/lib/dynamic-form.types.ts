export type locale = string;

export type SubFields = (() => Field[]) | Field[];

export interface DynamicFormConfig {
  fields: Field[];
  values?: { [key: string]: any };
  // form?: any;
  locales?: locale[];
}

export interface FieldParent {
  key: string;
  values: any[] | boolean;
  fromParent?: boolean;
}

export interface FieldValidation {
  required?: boolean;
  min?: any;
  max?: any;
  minLength?: any;
  maxLength?: any;
  pattern?: string;
  minItems?: number;
  maxItems?: number;
  allowedTypes?: string[];
}
export interface FieldOption {
  title: string;
  key: string;
  description?: string;
  hidden?: boolean;
  data?: any;
}

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
  | 'action';

export interface FieldTemplate<T> {
  /* Basics */
  type: FieldTypes;
  key?: string;
  title?: string;
  description?: string;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  hidden?: boolean;
  /* Advanced */
  value?: T;
  defaultValue?: T;
  // tab?: string;
  localize?: boolean;
  validation?: FieldValidation;
  parent?: FieldParent;
  /* Functions */
  asyncCondition?: (form?: any) => any;
  fields?: SubFields;
  output?: string;
  options?: FieldOption[];
  flat?: boolean;
  style?: FieldStyleBase;
}

export interface FieldStyleBase {
  grow?: number;
  className?: string;
  css?: string;
}

export interface FieldBase<T> extends FieldTemplate<T> {
  key: string;
}

/* Fields */

export type TextFieldTypes =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'password'
  | 'search'
  | 'url';
export interface TextField extends FieldBase<string | number> {
  type: TextFieldTypes;
}
export interface TextareaField extends FieldBase<string> {
  type: 'textarea';
  layout?: 'textarea' | 'editable-div';
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

export interface MarkdownField extends FieldBase<string> {
  type: 'markdown';
  elements?: MarkdownElements;
}
export interface FileField extends FieldBase<string> {
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
export interface ActionField extends FieldBase<string> {
  type: 'action';
  attributes: any;
  button: string;
  preview: ActionFieldLayouts;
  events: {
    click: (
      attributes: any,
      prev: any,
    ) => Promise<{ [key: string]: any } | { [key: string]: any }[]>;
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
  | ActionFieldTextPreview
  | ActionFieldInputPreview
  | ActionFieldLinkPreview
  | ActionFieldImagePreview
  | ActionFieldCardPreview;

export interface ActionFieldTextPreview {
  layout: 'text';
  textKey: string;
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

export interface DropdownField extends FieldBase<string> {
  type: 'dropdown';
  multiple?: boolean;
  output?: 'key' | 'data' | 'boolean-map';
  display?: 'input-only' | 'chips';
  options: FieldOption[];
}

export interface GroupField extends FieldBase<object> {
  type: 'group';
  flat?: boolean;
  fields: SubFields;
  style?: ContainerFieldStyle;
}
export interface ContainerField extends FieldTemplate<null> {
  type: 'container';
  fields: SubFields;
  style?: ContainerFieldStyle;
}

export interface ContainerFieldStyle extends FieldStyleBase {
  direction?: 'column' | 'row';
  wrap?: boolean;
}

export interface RepeaterField extends FieldBase<object[]> {
  type: 'repeater';
  fields: SubFields;
  display?: string;
}

export interface CheckboxField extends FieldBase<boolean> {
  type: 'checkbox';
  title: string;
}
export interface CheckboxGroupField extends FieldBase<string[]> {
  type: 'checkbox-group';
  output?: 'key' | 'data' | 'boolean-map';
  options: FieldOption[];
}
export interface RadioField extends FieldBase<string[]> {
  type: 'radio';
  options: FieldOption[];
}
export interface ColorField extends FieldBase<string> {
  type: 'color';
  output: 'hex' | 'rgba';
  swatches?: string[];
  opacity?: boolean;
}
export interface ChipsField extends FieldBase<string[]> {
  type: 'chips';
  allowDuplicates?: boolean;
}

export interface ChipItem {
  key: string | number;
  title: string;
}
export interface DateField extends FieldBase<string> {
  type: 'date';
  output?: string;
  display?: string;
}

export interface RelationItem {
  key: string;
  title: string;
  typeName?: string;
}
export interface RelationField extends FieldBase<string[]> {
  type: 'relation';
  items: RelationItem[];
  actions?: {
    loadmore: () => void;
  };
}

export interface InfoField extends FieldTemplate<null> {
  type: 'info';
  body: string;
}

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

export type Field = InfoField | ContainerField | FormField;
