import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { DynamicFormFieldBase } from '../../common/dynamic-form-field-base.class';
import { FormStateService } from '../../core/form-state.service';
import { DynamicForm } from '../../dynamic-form.class';
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

  constructor(private formState: FormStateService) {
    super();
  }

  public handleClick(): void {
    if (this.control.root.valid) {
      this.formState.submitForm();
      if (this.field.events) {
        if (this.field.events.submit) {
          this.field.events.submit(this.control.root);
        }
      }
    } else {
      console.log('DF error: Form is invalid but trying to submit!');
      this.field.events.error(this.control.root);
    }
  }
}
