import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  QueryList,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FieldTemplate, Field } from '../../dynamic-form.types';
import { RepeaterField } from './repeater.types';
import { DynamicFormFactory } from '../../core/dynamic-form-factory';
import { DynamicFormComponents } from '../../core/dynamic-form-components';

@Component({
  selector: 'dyna-repeater',
  templateUrl: './repeater.component.html',
  styleUrls: ['./repeater.component.scss'],
})
export class RepeaterComponent implements OnInit, AfterViewInit {
  @Input()
  field: RepeaterField;
  @Input()
  control: FormArray;
  @Input() formComponents: DynamicFormComponents;
  @Input()
  formFactory: DynamicFormFactory;

  @ViewChildren('fieldsElement') subFields: QueryList<
    ElementRef<HTMLDivElement>
  >;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.field.collapsed) {
      this.subFields.forEach(({ nativeElement }) => {
        nativeElement.style.maxHeight = `0px`;
        nativeElement.style.opacity = `0`;
      });
    }
  }

  public addItem() {
    const controls = this.formFactory.formControlsFactory(
      this.field.fields as FieldTemplate[],
    );
    const formGroup = this.fb.group(controls);
    this.control.push(formGroup);
  }

  public drop(event: CdkDragDrop<string[]>) {
    const items: Field[] = this.control.value;
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    this.control.setValue(items);
  }

  deleteControlItem(i: number, el: HTMLDivElement) {
    /* const deleteConfirmation = confirm('Confirm removal');
    if (deleteConfirmation) { */
    let start: number;
    const totalTime = 300;
    const maxHeight = el.clientHeight;
    const collapseStep = (timestamp) => {
      if (start === undefined) {
        start = timestamp;
      }
      const elapsedTime = timestamp - start;
      const elapsedPercent =
        Math.round(((timestamp - start) / totalTime) * 100) / 100;

      el.style.maxHeight = `${Math.floor(maxHeight * (1 - elapsedPercent))}px`;
      el.style.opacity = `${1 - elapsedPercent}`;

      if (elapsedTime < totalTime) {
        window.requestAnimationFrame(collapseStep);
      } else {
        this.control.removeAt(i);
      }
    };
    window.requestAnimationFrame(collapseStep);
    /* } */
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
