interface FormConfig {
  fields: Field[];
  childFields?: Field[];
  values?: { [key: string]: any };
  form?: any;
  localize?: boolean;
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
  type: FieldTypes;
  key: string;
  group?: string;
  title?: string;
  description?: string;
  label?: string;
  asyncCondition?: (form?: any) => any;
  disabled?: boolean;
  localisation?: boolean;
  defaultValue?: T;
  parent?: FieldParent;
  value?: T;
  validation?: FieldValidation;
  placeholder?: string;
  hint?: string;
}

interface TextField extends _FieldBase<string> {
  type: 'text' | 'number' | 'email';
}
interface TextareaField extends _FieldBase<string> {
  type: 'textarea';
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
