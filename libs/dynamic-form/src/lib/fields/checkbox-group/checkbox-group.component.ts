import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DynamicFormFieldBase } from '../../common/dynamic-form-field-base.class';
import { CheckboxGroupField } from './checkbox-group.types';

@Component({
  selector: 'dyna-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
})
export class CheckboxGroupComponent
  extends DynamicFormFieldBase
  implements OnInit {
  @Input()
  field: CheckboxGroupField;
  @Input()
  control: FormGroup;

  ngOnInit() {}

  handleChange(key: string, checked: boolean) {
    if (!this.control.disabled) {
      if (this.field.output === 'boolean-map') {
        this.control.controls[key].setValue(!checked);
        this.control.markAsTouched();
        this.control.controls[key].markAsTouched();
      } else if (checked) {
        const value: string[] = this.control.value || [];
        this.control.setValue([...value.filter((val) => val !== key)]);
        this.control.markAsTouched();
      } else {
        const value: string[] = this.control.value || [];
        this.control.setValue([...value, key]);
        this.control.markAsTouched();
      }
    }
  }

  getChecked(key: string): Observable<boolean> {
    return this.control.valueChanges.pipe(
      startWith(this.control.value),
      map((values: string[]) => {
        if (values) {
          if (this.field.output === 'boolean-map') {
            return values[key];
          }
          return values.includes(key);
        }
        return false;
      }),
    );
  }
}
