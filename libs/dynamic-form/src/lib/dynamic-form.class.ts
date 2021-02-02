// tslint:disable: variable-name
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, first, map, shareReplay, switchMap } from 'rxjs/operators';
import { DynamicFormInputs, Field, FormValues } from './dynamic-form.types';

export class DynamicForm<T = FormValues> {
  private fieldsSubject = new BehaviorSubject<Field[]>(this.fields);
  private valuesSubject = new BehaviorSubject<FormValues>(this.values);
  private formSubject = new BehaviorSubject<FormGroup>(null);
  private localesSubject = new BehaviorSubject<string[]>(this.locales);
  private disabledSubject = new BehaviorSubject<boolean>(this.disabled);

  public onSubmit: EventEmitter<T>;

  constructor(
    private fields: Field[] = [],
    private values: FormValues = {},
    private locales?: string[],
    private disabled?: boolean,
  ) {}

  public getFields(): BehaviorSubject<Field[]> {
    return this.fieldsSubject;
  }

  public getValues(): Observable<FormValues> {
    return this.formSubject.pipe(
      filter((form) => !!form),
      switchMap((form) => form.valueChanges),
      shareReplay(1),
    );
  }
  public getLocales(): BehaviorSubject<string[]> {
    return this.localesSubject;
  }
  public getInputChanges(): Observable<DynamicFormInputs> {
    const initialFormValues = this.formSubject.pipe(
      first(),
      map((form) => {
        if (form && form.value) {
          return form.value;
        }
        return {};
      }),
    );
    return combineLatest([
      this.fieldsSubject,
      this.valuesSubject,
      this.localesSubject,
      this.disabledSubject,
      initialFormValues,
    ]).pipe(
      map(([fields, initialValues, locales, disabled, initialFormValues]) => {
        const values = { ...initialValues, ...initialFormValues };
        return { fields, values: { values }, locales, disabled };
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
