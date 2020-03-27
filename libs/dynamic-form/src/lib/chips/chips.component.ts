import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'dyna-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent implements OnInit {
  @Input()
  field: ChipsField;
  @Input()
  control: AbstractControl;

  public currentInputValue: string;

  constructor() {}

  ngOnInit(): void {}

  add() {
    const arr: string[] =
      (Array.isArray(this.control.value) && this.control.value) || [];
    arr.push(this.currentInputValue);
    this.control.setValue(arr);
    this.clearCurrentValue();
  }

  private clearCurrentValue() {
    this.currentInputValue = '';
  }
}
