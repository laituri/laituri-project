import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DynamicFormFieldBase } from '../dynamic-form-field-base.class';
import { TextField, TextFieldTypes } from '../dynamic-form.types';

@Component({
  selector: 'dyna-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent extends DynamicFormFieldBase {
  @Input()
  field: TextField;
  @Input()
  control: AbstractControl;
  @Input()
  type: TextFieldTypes = 'text';
}
