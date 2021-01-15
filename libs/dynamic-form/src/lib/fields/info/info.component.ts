import { Component, OnInit, Input } from '@angular/core';
import { DynamicFormFieldBase } from '../../common/dynamic-form-field-base.class';
import { InfoField } from './info.types';

@Component({
  selector: 'dyna-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent extends DynamicFormFieldBase implements OnInit {
  @Input()
  field: InfoField;

  ngOnInit(): void {}
}
