import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import { ChipItem } from '../../components/chip-list/chip-list.types';
import { DynamicFormFieldBase } from '../../common/dynamic-form-field-base.class';
import { ChipsField } from './chips.types';

@Component({
  selector: 'dyna-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent extends DynamicFormFieldBase implements OnInit {
  @Input()
  field: ChipsField;
  @Input()
  control: AbstractControl;

  public currentInputValue: string;

  public chips: Observable<ChipItem[]>;

  /* Since there is some black magic bug with sortable, we need to do some hacks to get list's working correctly */
  private wasDragged: boolean;
  private chipsCopy: ChipItem[];

  public uniqueWarning: boolean;
  public unAddedWarning: boolean;

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
        const chips = values.map((item, i) => {
          const chip: ChipItem = { key: `${i}-${item}`, title: item };
          return chip;
        });
        this.chipsCopy = chips;
        return chips;
      }),
    );
  }

  add() {
    if (!this.control.disabled && this.currentInputValue) {
      const values: string[] =
        (Array.isArray(this.control.value) && this.control.value) || [];
      if (
        !this.field.allowDuplicates &&
        values.includes(this.currentInputValue)
      ) {
        return (this.uniqueWarning = true);
      }
      this.uniqueWarning = false;
      values.push(this.currentInputValue);
      this.control.setValue(values);
      this.clearCurrentValue();
    }
  }

  handleInputBlur() {
    this.unAddedWarning = Boolean(this.currentInputValue?.trim())
      ? true
      : false;
  }

  onDrop(chips: ChipItem[]) {
    if (!this.control.disabled) {
      const values = chips.map((chip) => chip.title);
      this.wasDragged = true;
      this.control.setValue(values);
    }
  }

  onDelete(key: string) {
    if (!this.control.disabled) {
      const filteredValues = this.chipsCopy
        .filter((chip) => chip.key !== key)
        .map((chip) => chip.title);
      this.control.setValue(filteredValues);
    }
  }

  private clearCurrentValue() {
    this.currentInputValue = '';
  }
}
