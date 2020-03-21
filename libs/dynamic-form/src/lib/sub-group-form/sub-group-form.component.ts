import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormBase } from '../dynamic-form-base.class';

@Component({
  selector: 'app-sub-group-form',
  templateUrl: './sub-group-form.component.html',
  styleUrls: ['./sub-group-form.component.scss'],
})
export class SubGroupFormComponent extends DynamicFormBase implements OnInit {
  @Input()
  fields: Field[];
  @Input()
  field: MapField;
  @Input()
  control: FormGroup;

  ngOnInit() {}
}
