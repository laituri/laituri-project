import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  map,
  startWith,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
} from 'rxjs/operators';

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

  public chips: Observable<ChipItem[]>;

  private wasDragged: boolean;

  constructor() {}

  ngOnInit(): void {
    this.chips = this.control.valueChanges.pipe(
      startWith(this.control.value),
      filter(() => {
        if (this.wasDragged) {
          this.wasDragged = false;
          return false;
        }
        return true;
      }),
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

  add() {
    const values: string[] =
      (Array.isArray(this.control.value) && this.control.value) || [];
    if (this.field.uniqueValues && values.includes(this.currentInputValue)) {
      return;
    }
    values.push(this.currentInputValue);
    this.control.setValue(values);
    this.clearCurrentValue();
  }

  onDrop(chips: ChipItem[]) {
    const values = chips.map(chip => chip.title);
    this.wasDragged = true;
    this.control.setValue(values);
  }
  private clearCurrentValue() {
    this.currentInputValue = '';
  }
}
