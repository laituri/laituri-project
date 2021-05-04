// tslint:disable: variable-name
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, mergeMap, shareReplay } from 'rxjs/operators';
import {
  DynamicFormInputs,
  ErrorMessages,
  Field,
  FormValues,
} from './dynamic-form.types';

export class DynamicForm<T = FormValues> {
  private fieldsSubject = new BehaviorSubject<Field[]>(this.fields);
  private valuesSubject = new BehaviorSubject<FormValues>(this.values);
  private formSubject = new BehaviorSubject<FormGroup>(null);
  private localesSubject = new BehaviorSubject<string[]>(this.locales);
  private disabledSubject = new BehaviorSubject<boolean>(this.disabled);

  public onSubmit: EventEmitter<T>;

  constructor(
    private fields: Field[],
    private values?: FormValues,
    private locales?: string[],
    private disabled?: boolean,
    private errorMessages?: ErrorMessages,
  ) {}

  public getFields(): BehaviorSubject<Field[]> {
    return this.fieldsSubject;
  }
  public getValues(): Observable<FormValues> {
    return this.formSubject.pipe(
      filter((form) => !!form),
      mergeMap((form) => form.valueChanges),
      shareReplay(1),
    );
  }
  public getLocales(): BehaviorSubject<string[]> {
    return this.localesSubject;
  }
  public getErrorMessages(): ErrorMessages {
    return this.errorMessages;
  }
  public getInputChanges(): Observable<DynamicFormInputs> {
    return combineLatest([
      this.fieldsSubject,
      this.valuesSubject,
      this.localesSubject,
      this.disabledSubject,
    ]).pipe(
      map(([fields, values, locales, disabled]) => {
        const form = this.formSubject.value;
        return { fields, values, locales, disabled, form };
      }),
      shareReplay(1),
    );
  }
  public getForm(): Observable<FormGroup> {
    return this.formSubject;
  }
  public submitForm(disable: boolean = true): void {
    const { value } = this.formSubject.value;
    this.onSubmit.emit(value);
    this.setDisabled(disable);
  }
  public setFields(fields: Field[]): void {
    this.fieldsSubject.next(fields);
  }
  public setValues(values: FormValues): void {
    this.valuesSubject.next(values);
  }
  public setLocales(locales: string[]): void {
    this.localesSubject.next(locales);
  }
  public setDisabled(disabled: boolean): void {
    this.disabledSubject.next(disabled);
  }

  /* Internal */
  public _setForm(form: FormGroup): void {
    this.formSubject.next(form);
  }
  public _setOnSubmit(onSubmit: EventEmitter<T>): void {
    this.onSubmit = onSubmit;
  }
}
