type locale = string;

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
interface FieldOptions {
  title: string;
  key: string;
  selected?: boolean;
  tooltip?: string;
  color?: string;
  hidden?: boolean;
}

type FieldTypes =
  | TextFieldTypes
  | 'textarea'
  | 'markdown'
  | 'dropdown'
  | 'checkbox'
  | 'checkbox-group'
  | 'group'
  | 'repeater'
  | 'relation'
  | 'date'
  | 'radio'
  | 'color'
  | 'action';

interface _FieldBase<T> {
  /* Basics */
  type: FieldTypes;
  key: string;
  title: string;
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
  fields?: () => Field[] | Field[];
  output?: string;
  options?: FieldOptions[];
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
  events: {
    click: (attributes: any, prev: any) => Promise<{ data: string }>;
  };
}

interface DropdownField extends _FieldBase<string> {
  type: 'dropdown';
  options: FieldOptions[];
}

interface GroupField extends _FieldBase<object> {
  type: 'group';
  fields: () => Field[] | Field[];
}
interface RepeaterField extends _FieldBase<object[]> {
  type: 'repeater';
  fields: () => Field[] | Field[];
}

interface CheckboxField extends _FieldBase<boolean> {
  type: 'checkbox';
  label: string;
}
interface CheckboxGroupField extends _FieldBase<string[]> {
  type: 'checkbox-group';
  output?: 'string-array' | 'boolean-map';
  options: FieldOptions[];
}
interface RadioField extends _FieldBase<string[]> {
  type: 'radio';
  options: FieldOptions[];
}
interface ColorField extends _FieldBase<string> {
  type: 'color';
  output: 'hex' | 'rgba';
  swatches?: string[];
  opacity?: boolean;
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

type Field =
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
  | CheckboxGroupField;
