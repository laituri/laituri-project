import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { DynamicFormBase } from './dynamic-form-base.class';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent extends DynamicFormBase
  implements OnInit, OnDestroy {
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

  private subscriptions: Subscription[];

  ngOnInit() {
    let configSubscription: Subscription;
    if (this.config instanceof Observable) {
      configSubscription = this.config.subscribe(config => {
        this.form = this.formService.init(config);
      });
    } else {
      configSubscription = new BehaviorSubject(this.config).subscribe(
        config => {
          this.form = this.formService.init(config);
        },
      );
    }

    const valueChangeSubscription = this.form.valueChanges
      .pipe(debounceTime(420))
      .subscribe(values => {
        this.valueChange.emit(values);
      });

    const historySubscription = this.formService.startHistory();

    this.subscriptions = [
      configSubscription,
      valueChangeSubscription,
      historySubscription,
    ];
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  }

  public submitValues() {
    const values = this.form.value;
    console.log('on submit', values);
    this.submitForm.emit(values);
  }
}
