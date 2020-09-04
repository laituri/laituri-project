import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { RelationField } from '../dynamic-form.types';

@Component({
  selector: 'dyna-relation-select',
  templateUrl: './relation-select.component.html',
  styleUrls: ['./relation-select.component.scss'],
})
export class RelationSelectComponent implements OnInit {
  @Input()
  field: RelationField;
  @Input()
  control: FormGroup;
  constructor() {}

  ngOnInit() {}

  asd(e: any) {
    const key = e.target.value;
    const value = this.field.items.find((item) => item.key === key);
    // console.log(key);
    // console.log(this.control);

    this.control.controls.key.setValue(key);
  }
}
