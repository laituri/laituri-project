import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { DynamicFormBase } from '../dynamic-form-base.class';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DynamicFormService } from '../dynamic-form.service';
import { FieldTemplate, RepeaterField, Field } from '../dynamic-form.types';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'dyna-repeater',
  templateUrl: './repeater.component.html',
  styleUrls: ['./repeater.component.scss'],
})
export class RepeaterComponent extends DynamicFormBase implements OnInit {
  @Input()
  fields: FieldTemplate[];
  @Input()
  field: RepeaterField;
  @Input()
  controlsArray: FormArray;

  ngOnInit(): void {}

  constructor(public dfs: DynamicFormService) {
    super(dfs);
  }

  public addItem() {
    const item = this.contructForm(this.fields as FieldTemplate[], null);
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

  hideItemFields(el: HTMLDivElement) {
    const collapse = el.style.maxHeight !== '0px';
    let start: number;
    const totalTime = 300;
    if (collapse) {
      const maxHeight = el.clientHeight;
      function collapseStep(timestamp) {
        if (start === undefined) {
          start = timestamp;
        }
        const elapsedTime = timestamp - start;
        const elapsedPercent =
          Math.round(((timestamp - start) / totalTime) * 100) / 100;

        el.style.maxHeight = `${Math.floor(
          maxHeight * (1 - elapsedPercent),
        )}px`;
        el.style.opacity = `${1 - elapsedPercent}`;

        if (elapsedTime < totalTime) {
          window.requestAnimationFrame(collapseStep);
        }
      }
      window.requestAnimationFrame(collapseStep);
    } else {
      el.style.maxHeight = `initial`;
      function expandStep(timestamp) {
        if (start === undefined) {
          start = timestamp;
        }
        const elapsedTime = timestamp - start;
        const elapsedPercent =
          Math.round(((timestamp - start) / totalTime) * 100) / 100;
        el.style.opacity = `${elapsedPercent}`;

        if (elapsedTime < totalTime) {
          window.requestAnimationFrame(expandStep);
        }
      }
      window.requestAnimationFrame(expandStep);
    }
  }
}
