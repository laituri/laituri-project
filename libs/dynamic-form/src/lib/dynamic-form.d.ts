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

interface FieldTemplate<T> {
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

interface FieldStyleBase {
  grow?: number;
  className?: string;
  css?: string;
}

interface FieldBase<T> extends FieldTemplate<T> {
  key: string;
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
interface TextField extends FieldBase<string | number> {
  type: TextFieldTypes;
}
interface TextareaField extends FieldBase<string> {
  type: 'textarea';
  layout?: 'textarea' | 'editable-div';
}
interface MarkdownField extends FieldBase<string> {
  type: 'markdown';
}
interface ActionField extends FieldBase<string> {
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

interface DropdownField extends FieldBase<string> {
  type: 'dropdown';
  multiple?: boolean;
  output?: 'key' | 'data' | 'boolean-map';
  display?: 'input-only' | 'chips';
  options: FieldOption[];
}

interface GroupField extends FieldBase<object> {
  type: 'group';
  flat?: boolean;
  fields: SubFields;
  style?: ContainerFieldStyle;
}
interface ContainerField extends FieldTemplate<null> {
  type: 'container';
  fields: SubFields;
  style?: ContainerFieldStyle;
}

interface ContainerFieldStyle extends FieldStyleBase {
  direction?: 'column' | 'row';
  wrap?: boolean;
}

interface RepeaterField extends FieldBase<object[]> {
  type: 'repeater';
  fields: SubFields;
  display?: string;
}

interface CheckboxField extends FieldBase<boolean> {
  type: 'checkbox';
  title: string;
}
interface CheckboxGroupField extends FieldBase<string[]> {
  type: 'checkbox-group';
  output?: 'key' | 'data' | 'boolean-map';
  options: FieldOption[];
}
interface RadioField extends FieldBase<string[]> {
  type: 'radio';
  options: FieldOption[];
}
interface ColorField extends FieldBase<string> {
  type: 'color';
  output: 'hex' | 'rgba';
  swatches?: string[];
  opacity?: boolean;
}
interface ChipsField extends FieldBase<string[]> {
  type: 'chips';
  uniqueValues?: boolean;
}

interface ChipItem {
  key: string | number;
  title: string;
}
interface DateField extends FieldBase<string> {
  type: 'date';
  output?: string;
  display?: string;
}

interface RelationItem {
  key: string;
  title: string;
  typeName?: string;
}
interface RelationField extends FieldBase<string[]> {
  type: 'relation';
  items: RelationItem[];
  actions?: {
    loadmore: () => void;
  };
}

interface InfoField extends FieldTemplate<null> {
  type: 'info';
  body: string;
}

type FormField =
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
  | CheckboxGroupField;

type Field = InfoField | ContainerField | FormField;
