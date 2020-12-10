import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DynamicFormFieldBase } from '../dynamic-form-field-base.class';
import { SubmitField } from './submit.types';

@Component({
  selector: 'dyna-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss'],
})
export class SubmitComponent extends DynamicFormFieldBase implements OnInit {
  @Input()
  field: SubmitField;
  @Input()
  control: AbstractControl;

  ngOnInit(): void {}

  public handleClick(): void {
    if (this.control.root.valid) {
      this.field.events.submit(this.control.root);
    } else {
      console.log('DF error: Form is invalid but trying to submit!');
      this.field.events.error(this.control.root);
    }
  }
}
