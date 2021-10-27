import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {
  DynamicFormOptions,
  ErrorMessages,
  Field,
  FieldTemplate,
  FormValues,
  Locale,
} from './dynamic-form.types';

export class DynamicForm<T = FormValues> {
  private fieldsSubject = new BehaviorSubject<Field[]>(null);
  private initialValuesSubject = new BehaviorSubject<T>(null);
  private formValuesSubject = new BehaviorSubject<T>(null);
  private localesSubject = new BehaviorSubject<Locale[]>(null);
  private disabledSubject = new BehaviorSubject<boolean>(null);

  constructor(private options: DynamicFormOptions<T>) {
    this.setOptions(this.options);
  }

  public get fields(): BehaviorSubject<Field[]> {
    return this.fieldsSubject;
  }

  public get locales(): BehaviorSubject<Locale[]> {
    return this.localesSubject;
  }

  public get disabled(): Observable<boolean> {
    return this.disabledSubject;
  }

  public get errorMessages(): ErrorMessages {
    return this.options.errorMessages;
  }

  public get disableFormOnSubmit(): boolean {
    return this.options.disableFormOnSubmit;
  }

  public get valueChanges(): Observable<T> {
    return this.formValuesSubject;
  }

  public get fieldChanges(): Observable<{
    fields: FieldTemplate[];
    locales: Locale[];
    values: T;
  }> {
    return combineLatest([
      this.fieldsSubject,
      this.localesSubject,
      this.initialValuesSubject,
    ]).pipe(
      map(([fields, locales, values]) => {
        return { fields, locales, values };
      }),
      shareReplay(1),
    );
  }

  public setFields(fields: Field[]): void {
    this.fieldsSubject.next(fields);
  }

  public setValues(values: T): void {
    this.initialValuesSubject.next(values);
  }

  public setLocales(locales: Locale[]): void {
    this.localesSubject.next(locales);
  }

  public setDisabled(disabled: boolean): void {
    this.disabledSubject.next(disabled);
  }

  public _setCurrentFormValue(values: T) {
    this.formValuesSubject.next(values);
  }

  /* Internal */
  private setOptions(options: DynamicFormOptions<T>) {
    if (options) {
      const { fields, values, locales, disabled } = options;
      if (fields) {
        this.fieldsSubject.next(fields);
      }
      if (values) {
        this.initialValuesSubject.next(values);
      }
      if (locales) {
        this.localesSubject.next(locales);
      }
      if (disabled) {
        this.disabledSubject.next(disabled);
      }
    }
  }
}
