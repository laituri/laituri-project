import { Component, OnInit, Input } from '@angular/core';
import { DynamicFormBase } from '../dynamic-form-base.class';
import { FormGroup } from '@angular/forms';
import { DynamicFormService } from '../dynamic-form.service';

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

  constructor(public dfs: DynamicFormService) {
    super(dfs);
  }

  ngOnInit(): void {}
}
