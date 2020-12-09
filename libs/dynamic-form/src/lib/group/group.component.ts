import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { DynamicFormBase } from '../dynamic-form-base.class';
import { FormGroup } from '@angular/forms';
import { ContainerField, GroupField } from './group.types';
import { DynamicFormComponents } from '../dynamic-form-components';
import { DynamicFormFactory } from '../dynamic-form-factory';

@Component({
  selector: 'dyna-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent extends DynamicFormBase implements OnInit {
  @Input()
  field: GroupField | ContainerField;
  @Input()
  control: FormGroup;
  @Input() formComponents: DynamicFormComponents;
  @Input()
  formFactory: DynamicFormFactory;

  @HostBinding('class.row') get row() {
    return this.field.style && this.field.style.direction === 'row';
  }
  @HostBinding('attr.group-title') get groupTitle() {
    return this.field.title;
  }
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
