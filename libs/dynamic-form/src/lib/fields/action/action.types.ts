import { AbstractControl } from '@angular/forms';
import { FormFieldBase } from '../../dynamic-form.types';

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
