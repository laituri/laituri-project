import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'dyna-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {
  @Input()
  field: RadioField;
  @Input()
  control: AbstractControl;
  constructor() {}

  ngOnInit() {}

  handleChange(key: string) {
    this.control.setValue(key);
  }

  getChecked(key: string): Observable<boolean> {
    return this.control.valueChanges.pipe(
      startWith(this.control.value),
      map((value: string) => {
        return value === key;
      }),
    );
  }
}
