import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { DynamicFormBase } from '../dynamic-form-base.class';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'dyna-repeater',
  templateUrl: './repeater.component.html',
  styleUrls: ['./repeater.component.scss'],
})
export class RepeaterComponent extends DynamicFormBase implements OnInit {
  @Input()
  fields: Field[];
  @Input()
  field: RepeaterField;
  @Input()
  controlsArray: FormArray;

  ngOnInit(): void {}

  public addItem() {
    const item = this.contructForm(this.fields, null);
    this.controlsArray.push(item);
  }

  public drop(event: CdkDragDrop<string[]>) {
    const items: Field[] = this.controlsArray.value;
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    this.controlsArray.setValue(items);
  }

  deleteControlItem(i: number) {
    this.controlsArray.removeAt(i);
  }

  getDisplayValue(control: FormControl): string {
    const { display } = this.field;
    if (!display) {
      return '';
    }
    const value = control.value[display];
    if (!value) {
      return '';
    }
    return value.toString();
  }
}
