import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { DynamicFormFieldBase } from '../../common/dynamic-form-field-base.class';
import { CheckboxField } from './checkbox.types';

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

  public handleChange(checked: boolean, event?: MouseEvent): void {
    if (
      event &&
      event.target instanceof HTMLAnchorElement &&
      event.target.href
    ) {
      // Do nothing
    } else if (!this.control.disabled) {
      this.control.setValue(!checked);
      this.control.markAsTouched();
    }
  }

  public getChecked(): Observable<boolean> {
    return this.control.valueChanges.pipe(startWith(this.control.value));
  }
}
