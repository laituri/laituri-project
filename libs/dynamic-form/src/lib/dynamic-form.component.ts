import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { DynamicFormBase } from './dynamic-form-base.class';
import { debounceTime } from 'rxjs/operators';
import { DynamicFormService } from './dynamic-form.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent extends DynamicFormBase
  implements OnInit, OnDestroy, OnChanges {
  @Input()
  disabled = false;
  @Input()
  config: DynamicFormConfig | Observable<DynamicFormConfig>;
  @Input()
  submit: { hidden?: boolean; text?: string } = {
    hidden: false,
    text: 'Submit',
  };
  @Output()
  submitForm = new EventEmitter<any>();
  @Output()
  valueChange = new EventEmitter<any>();

  public form: FormGroup;
  public fields: Field[];

  private subscriptions: Subscription[];

  constructor(public dfs: DynamicFormService) {
    super(dfs);
  }

  ngOnInit() {
    let configObservable: Observable<DynamicFormConfig>;
    if (this.config instanceof Observable) {
      configObservable = this.config;
    } else {
      configObservable = new BehaviorSubject(this.config);
    }

    const configSubscription = configObservable.subscribe((config) => {
      this.fields = config.fields;
      this.form = this.formService.init(config);
    });

    const valueChangeSubscription = this.form.valueChanges
      .pipe(debounceTime(420))
      .subscribe((values) => {
        this.valueChange.emit(values);
      });

    const historySubscription = this.formService.startHistory();

    this.subscriptions = [
      configSubscription,
      valueChangeSubscription,
      historySubscription,
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.disabled && this.form) {
      if (changes.disabled.currentValue === true) {
        this.form.disable({ emitEvent: false });
      }
      if (changes.disabled.currentValue !== true) {
        this.form.enable({ emitEvent: false });
      }
    }
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
    }
  }

  public submitValues() {
    const values = this.form.value;
    this.submitForm.emit(values);
  }
}
