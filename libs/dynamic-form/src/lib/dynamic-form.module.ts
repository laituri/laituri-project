import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { TextComponent } from './text/text.component';
import { TextareaComponent } from './textarea/textarea.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { RadioComponent } from './radio/radio.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldParentPipe } from './field-parent.pipe';
import { SubArrayFormComponent } from './sub-array-form/sub-array-form.component';
import { SubGroupFormComponent } from './sub-group-form/sub-group-form.component';
import { RelationSelectComponent } from './relation-select/relation-select.component';
import { DynamicFormService } from './dynamic-form.service';
import { ActionComponent } from './action/action.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    DynamicFormComponent,
    TextComponent,
    TextareaComponent,
    DateTimeComponent,
    RadioComponent,
    CheckboxComponent,
    CheckboxGroupComponent,
    DropdownComponent,
    FieldParentPipe,
    SubArrayFormComponent,
    SubGroupFormComponent,
    RelationSelectComponent,
    ActionComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, DragDropModule, MatIconModule],
  exports: [DynamicFormComponent],
  providers: [DynamicFormService],
})
export class DynamicFormModule {}
