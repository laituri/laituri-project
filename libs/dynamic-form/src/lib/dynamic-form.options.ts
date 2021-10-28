import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, scan, shareReplay } from 'rxjs/operators';
import {
  DynamicFormOptions,
  DynamicFormOptionsFieldChanges,
  ErrorMessages,
  Field,
  FormValues,
  Locale,
  ValueMergeStrategy,
  ValueMergeStrategyOn,
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

  public get valueMergeStrategy(): ValueMergeStrategy {
    const defaultValueMergeStrategy = ValueMergeStrategy.MERGE_WITH_CURRENT;
    return this.options.valueMergeStrategy || defaultValueMergeStrategy;
  }

  public get valueMergeStrategyOn(): ValueMergeStrategyOn {
    const defaultValueMergeStrategyOn =
      ValueMergeStrategyOn.INITIAL_VALUE_CHANGE;
    return this.options.valueMergeStrategyOn || defaultValueMergeStrategyOn;
  }

  public get initialValues(): Observable<T> {
    return this.initialValuesSubject;
  }

  public get valueChanges(): Observable<T> {
    return this.formValuesSubject;
  }

  public get fieldChanges(): Observable<DynamicFormOptionsFieldChanges> {
    return combineLatest([
      this.fieldsSubject,
      this.localesSubject,
      this.initialValuesSubject,
    ]).pipe(
      scan((prev, cur): any => {
        const changes = {
          fields: true,
          locales: true,
          values: true,
        };
        if (!prev) {
          return [...cur, changes];
        }

        const [prevFields, prevLocales, prevValues] = prev;
        const [curFields, curLocales, curValues] = cur;

        if (this.isSame(prevFields, curFields)) {
          changes.fields = false;
        }
        if (this.isSame(prevLocales, curLocales)) {
          changes.locales = false;
        }
        if (this.isSame(prevValues, curValues)) {
          changes.values = false;
        }

        return [...cur, changes];
      }),
      map(([fields, locales, values, changes]) => {
        if (!changes) {
          changes = {
            fields: true,
            locales: true,
            values: true,
          };
        }
        return { fields, locales, values, changes };
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

  private isSame(obj1: unknown, obj2: unknown): boolean {
    try {
      if (obj1 === obj2) {
        return true;
      }
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    } catch (error) {
      return false;
    }
  }
}
