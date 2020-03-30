import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DynamicFormFieldBase } from '../dynamic-form-field-base.class';

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

  change(value: string) {
    if (this.field.type === 'number') {
      this.control.setValue(Number(value));
    } else {
      this.control.setValue(value);
    }
  }
}
