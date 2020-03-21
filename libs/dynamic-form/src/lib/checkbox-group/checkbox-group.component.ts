import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
})
export class CheckboxGroupComponent implements OnInit {
  @Input()
  field: CheckboxGroupField;
  @Input()
  control: AbstractControl;
  constructor() {}

  ngOnInit() {}

  handleChange(key: string, ev: { target: { checked: boolean } }) {
    if (ev.target.checked) {
      const value: string[] = this.control.value || [];
      this.control.setValue([...value, key]);
    } else {
      const value: string[] = this.control.value || [];
      this.control.setValue([...value.filter(val => val !== key)]);
    }
  }

  getChecked(key: string): Observable<boolean> {
    return this.control.valueChanges.pipe(
      startWith(this.control.value),
      map((values: string[]) => {
        if (values) {
          return values.includes(key);
        }
        return false;
      }),
    );
  }
}
