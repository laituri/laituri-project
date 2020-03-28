import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getChips(): Observable<ChipItem[]> {
    return this.control.valueChanges.pipe(
      map((values: string[]): ChipItem[] => {
        if (!values) {
          return null;
        }
        return values.map((item, i) => {
          const chip: ChipItem = { key: i, title: item };
          return chip;
        });
      }),
    );
  }
}
