import {
  Component,
  OnInit,
  Input,
  HostBinding,
  ElementRef,
  TemplateRef,
} from '@angular/core';
import { DynamicFormBase } from '../dynamic-form-base.class';
import { FormGroup } from '@angular/forms';
import { DynamicFormService } from '../dynamic-form.service';
import {
  Field,
  GroupField,
  ContainerField,
  FieldTemplate,
} from '../dynamic-form.types';

@Component({
  selector: 'dyna-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent extends DynamicFormBase implements OnInit {
  @Input()
  fields: FieldTemplate[];
  @Input()
  field: GroupField | ContainerField;
  @Input()
  control: FormGroup;
  @Input()
  customFieldsTemplate: TemplateRef<any>;

  @HostBinding('class.row') get row() {
    return this.field.style && this.field.style.direction === 'row';
  }
  @HostBinding('attr.group-title') get groupTitle() {
    return this.field.title;
  }
  constructor(public dfs: DynamicFormService) {
    super(dfs);
  }

  ngOnInit(): void {}
}
