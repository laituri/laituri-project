type locale = string;

type SubFields = (() => Field[]) | Field[];

interface DynamicFormConfig {
  fields: Field[];
  values?: { [key: string]: any };
  // form?: any;
  locales?: locale[];
}

interface FieldParent {
  key: string;
  values: any[] | boolean;
  fromParent?: boolean;
}

interface FieldValidation {
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
interface FieldOption {
  title: string;
  key: string;
  description?: string;
  hidden?: boolean;
  data?: any;
}

type FieldTypes =
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
  | 'action';

interface _FieldBase<T> {
  /* Basics */
  type: FieldTypes;
  key: string;
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
  /* Misc */
  fields?: SubFields;
  output?: string;
  options?: FieldOption[];
  flat?: boolean;
}

/* Fields */

type TextFieldTypes =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'password'
  | 'search'
  | 'url';
interface TextField extends _FieldBase<string> {
  type: TextFieldTypes;
}
interface TextareaField extends _FieldBase<string> {
  type: 'textarea';
  layout?: 'textarea' | 'editable-div';
}
interface MarkdownField extends _FieldBase<string> {
  type: 'markdown';
}
interface ActionField extends _FieldBase<string> {
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

interface ActionFieldKeys {
  urlKey?: string;
  textKey?: string;
  imageKey?: string;
  titleKey?: string;
  idKey?: string;
  descriptionKey?: string;
}

type ActionFieldLayouts =
  | ActionFieldTextPreview
  | ActionFieldInputPreview
  | ActionFieldLinkPreview
  | ActionFieldImagePreview
  | ActionFieldCardPreview;

interface ActionFieldTextPreview {
  layout: 'text';
  textKey: string;
}
interface ActionFieldInputPreview {
  layout: 'input';
  textKey: string;
}
interface ActionFieldLinkPreview {
  layout: 'link';
  urlKey: string;
}
interface ActionFieldImagePreview {
  layout: 'image';
  imageKey: string;
}
interface ActionFieldCardPreview {
  layout: 'card';
  titleKey: string;
  idKey?: string;
  descriptionKey?: string;
  imageKey?: string;
}

interface DropdownField extends _FieldBase<string> {
  type: 'dropdown';
  multiple?: boolean;
  output?: 'key' | 'data' | 'boolean-map';
  display?: 'input-only' | 'chips';
  options: FieldOption[];
}

interface GroupField extends _FieldBase<object> {
  type: 'group';
  flat?: boolean;
  fields: SubFields;
}
interface ContainerField extends _FieldBase<object> {
  type: 'container';
  fields: SubFields;
}
interface RepeaterField extends _FieldBase<object[]> {
  type: 'repeater';
  fields: SubFields;
  display?: string;
}

interface CheckboxField extends _FieldBase<boolean> {
  type: 'checkbox';
}
interface CheckboxGroupField extends _FieldBase<string[]> {
  type: 'checkbox-group';
  output?: 'key' | 'data' | 'boolean-map';
  options: FieldOption[];
}
interface RadioField extends _FieldBase<string[]> {
  type: 'radio';
  options: FieldOption[];
}
interface ColorField extends _FieldBase<string> {
  type: 'color';
  output: 'hex' | 'rgba';
  swatches?: string[];
  opacity?: boolean;
}
interface ChipsField extends _FieldBase<string[]> {
  type: 'chips';
  uniqueValues?: boolean;
}

interface ChipItem {
  key: string | number;
  title: string;
}
interface DateField extends _FieldBase<string> {
  type: 'date';
  output?: string;
  display?: string;
}

interface RelationItem {
  key: string;
  title: string;
  typeName?: string;
}
interface RelationField extends _FieldBase<string[]> {
  type: 'relation';
  items: RelationItem[];
  actions?: {
    loadmore: () => void;
  };
}

interface InfoField {
  type: 'info';
  body: string;
}

type Field =
  | InfoField
  | TextField
  | TextareaField
  | MarkdownField
  | DropdownField
  | GroupField
  | ContainerField
  | RepeaterField
  | RadioField
  | RelationField
  | CheckboxField
  | ActionField
  | ColorField
  | DateField
  | ChipsField
  | CheckboxGroupField;
