import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DynamicFormFieldBase } from '../dynamic-form-field-base.class';
import { TextareaField } from './textarea.types';

@Component({
  selector: 'dyna-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent extends DynamicFormFieldBase {
  @Input()
  field: TextareaField;
  @Input()
  control: AbstractControl;
}
