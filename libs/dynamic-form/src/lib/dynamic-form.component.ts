import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription, BehaviorSubject, combineLatest } from 'rxjs';
import {
  debounceTime,
  filter,
  mergeMap,
  shareReplay,
  take,
} from 'rxjs/operators';
import { FormValues } from './dynamic-form.types';
import { DynamicForm } from './dynamic-form.options';
import { DynamicFormHistory } from './core/dynamic-form-history';
import { FormStateService } from './core/form-state.service';
import { DynamicFormFactoryService } from './core/dynamic-form-factory.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [FormStateService, DynamicFormFactoryService],
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input()
  options: DynamicForm;

  @Output('submit')
  onSubmit: EventEmitter<FormValues> = this.formState.submit;

  @Output()
  valueChange: EventEmitter<FormValues> = this.formState.valueChange;

  @Output()
  statusChange: EventEmitter<string> = this.formState.statusChange;

  @Output()
  formChange: EventEmitter<FormGroup> = this.formState.formChange;

  public currentForm: BehaviorSubject<FormGroup> = this.formState.currentForm;
  public history: DynamicFormHistory;

  private subscriptions: Subscription[] = [];
  private disabledObservable: Observable<boolean>;
  private valueChangesObservable: Observable<FormValues>;
  private statusChangesObservable: Observable<string>;
  private currentFormValues = new BehaviorSubject<FormValues>(null);

  constructor(
    private formState: FormStateService,
    private dynamicFormFactoryService: DynamicFormFactoryService,
  ) {}

  ngOnInit() {
    this.history = new DynamicFormHistory();

    this.formState.setOptions(this.options);
    this.disabledObservable = this.options.disabled;

    this.valueChangesObservable = this.currentForm.pipe(
      filter((form) => form !== null),
      mergeMap((form) => {
        return form.valueChanges;
      }),
      debounceTime(200),
      shareReplay(1),
    );

    this.statusChangesObservable = this.currentForm.pipe(
      filter((form) => form !== null),
      mergeMap((form) => {
        return form.statusChanges;
      }),
      debounceTime(200),
      shareReplay(1),
    );

    const formSubscription = this.currentForm.subscribe((form) => {
      this.formChange.emit(form);
    });

    const statusChangesSubscription = this.statusChangesObservable.subscribe(
      (status) => {
        this.statusChange.emit(status);
      },
    );

    const fieldChangesSubscription = this.options.fieldChanges.subscribe(
      async (options) => {
        const prev = await this.currentFormValues.pipe(take(1)).toPromise();
        const newForm = this.dynamicFormFactoryService.contructForm(
          options,
          prev,
        );
        this.currentForm.next(newForm);
        return newForm;
      },
    );

    const disabledSubscription = combineLatest([
      this.currentForm,
      this.disabledObservable,
    ])
      .pipe(filter(([form]) => form !== null))
      .subscribe(([form, isDisabled]) => {
        if (isDisabled) {
          form.disable({ emitEvent: false });
        } else {
          form.enable({ emitEvent: false });
        }
      });

    const valueChangeSubscription = this.valueChangesObservable.subscribe(
      (values) => {
        this.currentFormValues.next(values);
        this.valueChange.emit(values);
        this.history.pushToHistory(values);
      },
    );

    const historySubscription = this.history
      .historyKeyboardEvents()
      .pipe(filter((event) => !!event))
      .subscribe((event) => {
        const form = this.currentForm.value;
        if (event === 'redo') {
          this.history.redo(form);
        }
        if (event === 'undo') {
          this.history.undo(form);
        }
      });

    this.subscriptions = [
      formSubscription,
      statusChangesSubscription,
      fieldChangesSubscription,
      disabledSubscription,
      valueChangeSubscription,
      historySubscription,
    ];
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
  }

  public submitValues() {
    const { value } = this.currentFormValues;
    console.log('Old submit event!', { value });
    this.onSubmit.emit(value);
  }

  public getControl(control: FormGroup, field: { key: string }): any {
    return control.get(field.key);
  }

  public getForm() {
    return this.currentForm;
  }
}
