import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DynamicFormFieldBase } from '../../common/dynamic-form-field-base.class';
import { RadioField } from './radio.types';

@Component({
  selector: 'dyna-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent extends DynamicFormFieldBase implements OnInit {
  @Input()
  field: RadioField;
  @Input()
  control: AbstractControl;

  ngOnInit() {}

  public handleChange(key: string): void {
    if (!this.control.disabled) {
      this.control.setValue(key);
    }
  }
}
