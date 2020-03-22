import { Component, OnInit, Input } from '@angular/core';
import { DynamicFormBase } from '../dynamic-form-base.class';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'dyna-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent extends DynamicFormBase implements OnInit {
  @Input()
  fields: Field[];
  @Input()
  field: GroupField;
  @Input()
  control: FormGroup;

  ngOnInit(): void {}
}
