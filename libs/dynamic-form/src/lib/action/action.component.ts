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

  public previewValues: { [key: string]: string | number }[];

  constructor() {}

  ngOnInit(): void {
    // console.log(this.field.preview);
  }

  async getValue() {
    const current = this.control.value;
    const response = await this.field.events.click(
      this.field.attributes,
      current,
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

  getPreview(value: {
    [key: string]: string | number;
  }): { [key: string]: string | number } {
    const {
      textKey,
      imageKey,
      titleKey,
      idKey,
      urlKey,
      descriptionKey,
    }: ActionFieldKeys = this.field.preview;

    return {
      text: value[textKey] || null,
      url: value[urlKey] || null,
      image: value[imageKey] || null,
      title: value[titleKey] || null,
      id: value[idKey] || null,
      description: value[descriptionKey] || null,
    };
  }
}
