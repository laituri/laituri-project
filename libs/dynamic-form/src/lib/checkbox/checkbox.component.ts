import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { DynamicFormFieldBase } from '../dynamic-form-field-base.class';
import { CheckboxField } from '../dynamic-form.types';

@Component({
  selector: 'dyna-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent extends DynamicFormFieldBase implements OnInit {
  @Input()
  field: CheckboxField;
  @Input()
  control: AbstractControl;

  ngOnInit() {}

  public handleChange(checked: boolean): void {
    if (!this.control.disabled) {
      this.control.setValue(!checked);
      this.control.markAsTouched();
    }
  }

  public getChecked(): Observable<boolean> {
    return this.control.valueChanges.pipe(startWith(this.control.value));
  }
}
