import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'dyna-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit {
  @Input()
  field: ActionField;
  @Input()
  control: AbstractControl;
  constructor() {}

  ngOnInit(): void {}

  async getValue() {
    const current = this.control.value;
    const response = await this.field.events.click(
      this.field.attributes,
      current,
    );
    this.control.setValue(response.data);
  }

  clear() {
    this.control.setValue('');
  }
}
