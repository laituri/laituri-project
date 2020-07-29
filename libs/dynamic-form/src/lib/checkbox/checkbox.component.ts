import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'dyna-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input()
  field: CheckboxField;
  @Input()
  control: AbstractControl;
  constructor() {}

  ngOnInit() {}

  handleChange(checked: boolean) {
    this.control.setValue(!checked);
  }

  getChecked(): Observable<boolean> {
    return this.control.valueChanges.pipe(startWith(this.control.value));
  }
}
