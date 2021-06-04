import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContainerField, GroupField } from './group.types';
import { DynamicFormFactory } from '../../core/dynamic-form-factory';

@Component({
  selector: 'dyna-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  @Input()
  field: GroupField | ContainerField;
  @Input()
  control: FormGroup;
  @Input()
  formFactory: DynamicFormFactory;

  @HostBinding('class.row') get row() {
    return this.field.style && this.field.style.direction === 'row';
  }
  @HostBinding('attr.group-title') get groupTitle() {
    return this.field.title;
  }
  constructor() {}

  ngOnInit(): void {}
}
