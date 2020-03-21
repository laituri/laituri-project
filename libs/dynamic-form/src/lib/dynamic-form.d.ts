type locale = string;

interface DynamicFormConfig {
  fields: Field[];
  values?: { [key: string]: any };
  form?: any;
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
  | 'action'
  | 'text'
  | 'number'
  | 'email'
  | 'url'
  | 'tel'
  | 'textarea'
  | 'dropdown'
  | 'map'
  | 'repeater'
  | 'relation'
  | 'date-time'
  | 'radio'
  | 'checkbox'
  | 'checkbox-group';

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
  group?: string;
  localisation?: boolean;
  validation?: FieldValidation;
  parent?: FieldParent;
  /* Functions */
  asyncCondition?: (form?: any) => any;
}

/* Fields */
interface TextField extends _FieldBase<string> {
  type: 'text' | 'number' | 'email';
}
interface TextareaField extends _FieldBase<string> {
  type: 'textarea';
  layout?: 'textarea' | 'editable-div' | 'markdown';
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

interface MapField extends _FieldBase<object> {
  type: 'map';
  fields?: Field[];
}
interface RepeaterField extends _FieldBase<object[]> {
  type: 'repeater';
  fields?: Field[];
}
interface TelField extends _FieldBase<string> {
  type: 'tel';
}
interface EmailField extends _FieldBase<string> {
  type: 'email';
}
interface UrlField extends _FieldBase<string> {
  type: 'url';
}
interface CheckboxField extends _FieldBase<boolean> {
  type: 'checkbox';
}
interface CheckboxGroupField extends _FieldBase<string[]> {
  type: 'checkbox-group';
  options: FieldOptions[];
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
  | DropdownField
  | MapField
  | RepeaterField
  | TelField
  | EmailField
  | UrlField
  | RelationField
  | CheckboxField
  | ActionField
  | CheckboxGroupField;
