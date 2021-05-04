import { Injectable } from '@angular/core';
import { DynamicForm } from '../dynamic-form.class';
import { FormValues } from '../dynamic-form.types';

@Injectable()
export class FormStateService {
  public inputs: DynamicForm<FormValues>;
  constructor() {}

  setInputs(inputs: DynamicForm) {
    this.inputs = inputs;
  }

  public submitForm() {
    this.inputs.submitForm(true);
  }
}
