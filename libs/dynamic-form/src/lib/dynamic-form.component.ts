import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import {
  debounceTime,
  filter,
  map,
  mergeMap,
  shareReplay,
} from 'rxjs/operators';

import {
  DynamicFormFieldComponentConfig,
  DynamicFormInputs,
  FieldTemplate,
  FormValues,
} from './dynamic-form.types';
import { DynamicForm } from './dynamic-form.class';
import { DynamicFormFactory } from './core/dynamic-form-factory';
import { DynamicFormHistory } from './core/dynamic-form-history';
import { FormStateService } from './core/form-state.service';
import { DynamicFormComponentsService } from './core/dynamic-form-components.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input()
  inputs: DynamicForm;

  @Input()
  components?: DynamicFormFieldComponentConfig[];

  @Input()
  discardDefaultComponents?: boolean;

  @Output()
  onSubmit = new EventEmitter<FormValues>();

  @Output()
  valueChange = new EventEmitter<any>();

  @ViewChild('formElement') formElement: ElementRef<HTMLElement>;

  public inputsObservable: Observable<DynamicFormInputs>;
  public formObservable: Observable<FormGroup>;
  public fields: FieldTemplate[];
  public history: DynamicFormHistory;
  public formFactory: DynamicFormFactory;

  private subscriptions: Subscription[];
  private valueChangesObservable: Observable<FormValues>;
  private currentForm = new BehaviorSubject<FormGroup>(null);
  private currentFormValues = new BehaviorSubject<FormValues>(null);

  constructor(
    private formBuilder: FormBuilder,
    private formState: FormStateService,
    private componentsService: DynamicFormComponentsService,
  ) {}

  ngOnInit() {
    this.inputs._setOnSubmit(this.onSubmit);
    this.formState.setInputs(this.inputs);
    this.formFactory = new DynamicFormFactory(
      this.formBuilder,
      this.componentsService,
    );
    this.inputsObservable = this.inputs.getInputChanges();

    this.formObservable = this.inputsObservable.pipe(
      map((inputs) => {
        const form = this.formFactory.contructForm(inputs);
        console.log({ inputs, form });
        this.currentForm.next(form);
        this.inputs._setForm(form);
        return form;
      }),
      shareReplay(1),
    );

    this.valueChangesObservable = this.formObservable.pipe(
      mergeMap((form) => {
        return form.valueChanges;
      }),
      debounceTime(200),
      shareReplay(1),
    );

    this.history = new DynamicFormHistory();

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
    this.subscriptions = [valueChangeSubscription, historySubscription];
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
}
