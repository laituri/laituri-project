// tslint:disable: variable-name
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DynamicFormInputs, Field, FormValues } from './dynamic-form.types';

export class DynamicForm {
  private fieldsSubject = new BehaviorSubject<Field[]>(this.fields);
  private valuesSubject = new BehaviorSubject<FormValues>(this.values);
  private localesSubject = new BehaviorSubject<string[]>(this.locales);
  private disabledSubject = new BehaviorSubject<boolean>(this.disabled);

  constructor(
    private fields: Field[],
    private values?: FormValues,
    private locales?: string[],
    private disabled?: boolean,
  ) {}

  public getFields(): BehaviorSubject<Field[]> {
    return this.fieldsSubject;
  }
  public getValues(): BehaviorSubject<FormValues> {
    return this.valuesSubject;
  }
  public getLocales(): BehaviorSubject<string[]> {
    return this.localesSubject;
  }
  public getInputChanges(): Observable<DynamicFormInputs> {
    return combineLatest([
      this.fieldsSubject,
      this.valuesSubject,
      this.localesSubject,
    ]).pipe(
      map(([fields, values, locales]) => {
        return { fields, values, locales };
      }),
      shareReplay(1),
    );
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
}
