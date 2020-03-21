import { Component, OnInit, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { DynamicFormBase } from '../dynamic-form-base.class';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'dyna-sub-array-form',
  templateUrl: './sub-array-form.component.html',
  styleUrls: ['./sub-array-form.component.scss'],
})
export class SubArrayFormComponent extends DynamicFormBase implements OnInit {
  @Input()
  fields: Field[];
  @Input()
  field: RepeaterField;
  @Input()
  controlsArray: FormArray;

  ngOnInit() {}

  public addItem() {
    const item = this.contructForm(this.fields, null);
    this.controlsArray.push(item);
  }

  drop(event: CdkDragDrop<string[]>) {
    const items: Field[] = this.controlsArray.value;
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    this.controlsArray.setValue(items);
  }

  deleteControlItem(i: number) {
    this.controlsArray.removeAt(i);
  }
}
