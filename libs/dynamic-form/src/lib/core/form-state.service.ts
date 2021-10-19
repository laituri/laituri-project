import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { DynamicForm } from '../dynamic-form.options';
import { FormValues } from '../dynamic-form.types';

@Injectable()
export class FormStateService {
  public options: DynamicForm<FormValues>;
  public currentForm = new BehaviorSubject<FormGroup>(null);
  public submit: EventEmitter<FormValues> = new EventEmitter<FormValues>();
  public valueChange: EventEmitter<FormValues> = new EventEmitter<FormValues>();
  public statusChange: EventEmitter<string> = new EventEmitter<string>();
  public formChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor() {}

  setOptions(options: DynamicForm) {
    this.options = options;
  }

  public submitForm(disableFormOnSubmit: boolean = true) {
    const form = this.currentForm.value;
    if (form.valid) {
      if (this.options.disableFormOnSubmit !== false) {
        this.options.setDisabled(disableFormOnSubmit);
      }
      this.submit.emit(form.value);
    }
  }

  public async getDefaultLocale() {
    const locales = await this.options.locales.pipe(take(1)).toPromise();
    const defaultLocale = locales.find((locale) => locale.default);
    if (!defaultLocale) {
      return locales[0];
    }
    return defaultLocale;
  }
}
