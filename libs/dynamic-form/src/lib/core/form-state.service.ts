import { EventEmitter, Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { DynamicForm } from '../dynamic-form.options';
import { FormValues } from '../dynamic-form.types';

@Injectable()
export class FormStateService {
  public options: DynamicForm<FormValues>;
  public currentForm = new UntypedFormGroup({});
  public submit: EventEmitter<FormValues> = new EventEmitter<FormValues>();
  public valueChange: EventEmitter<FormValues> = new EventEmitter<FormValues>();
  public statusChange: EventEmitter<string> = new EventEmitter<string>();
  public formChange: EventEmitter<UntypedFormGroup> = new EventEmitter<UntypedFormGroup>();

  constructor() {}

  setOptions(options: DynamicForm) {
    this.options = options;
  }

  public submitForm(disableFormOnSubmit: boolean = true) {
    const { valid, value } = this.currentForm;
    if (valid) {
      if (this.options.disableFormOnSubmit !== false) {
        this.options.setDisabled(disableFormOnSubmit);
      }
      this.submit.emit(value);
    }
  }

  public getDefaultLocale() {
    const locales = this.options.locales.value;
    const defaultLocale = locales.find((locale) => locale.default);
    if (!defaultLocale) {
      return locales[0];
    }
    return defaultLocale;
  }
}
