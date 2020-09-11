import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActionField, ActionFieldKeys } from '../dynamic-form.types';

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

  public previewValues: { [key: string]: string | number }[];

  constructor() {}

  ngOnInit(): void {
    const values = this.control.value;
    if (Array.isArray(values)) {
      this.previewValues = values.map((value) => this.getPreview(value));
    } else {
      this.previewValues = [this.getPreview(values)];
    }
  }

  async getValue() {
    const current = this.control.value;
    const response = await this.field.events.click(
      current,
      this.control.root,
      this.field.attributes,
    );
    this.control.setValue(response);
    if (Array.isArray(response)) {
      this.previewValues = response.map((value) => this.getPreview(value));
    } else {
      this.previewValues = [this.getPreview(response)];
    }
  }

  clear() {
    this.control.setValue('');
  }

  getPreview(value: any): { [key: string]: string | number } {
    if (!value) {
      return null;
    }
    const {
      textKey,
      imageKey,
      titleKey,
      idKey,
      urlKey,
      descriptionKey,
    }: ActionFieldKeys = this.field.preview;

    if (typeof value === 'object') {
      return {
        text: value[textKey] || null,
        url: value[urlKey] || null,
        image: value[imageKey] || null,
        title: value[titleKey] || null,
        id: value[idKey] || null,
        description: value[descriptionKey] || null,
      };
    }
    return {
      text: value || null,
      url: value || null,
      image: value || null,
      title: value || null,
      id: value || null,
      description: value || null,
    };
  }
}
