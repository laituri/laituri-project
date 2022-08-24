import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ContainerField, GroupField } from './group.types';

@Component({
  selector: 'dyna-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  @Input()
  field: GroupField | ContainerField;
  @Input()
  control: UntypedFormGroup;

  @HostBinding('class.row') get row() {
    return this.field.style && this.field.style.direction === 'row';
  }
  @HostBinding('attr.group-title') get groupTitle() {
    return this.field.title;
  }
  constructor() {}

  ngOnInit(): void {}
}
