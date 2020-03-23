import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { TextComponent } from './text/text.component';
import { TextareaComponent } from './textarea/textarea.component';
import { RadioComponent } from './radio/radio.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldParentPipe } from './field-parent.pipe';
import { RelationSelectComponent } from './relation-select/relation-select.component';
import { DynamicFormService } from './dynamic-form.service';
import { ActionComponent } from './action/action.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { RepeaterComponent } from './repeater/repeater.component';
import { GroupComponent } from './group/group.component';
import { ColorComponent } from './color/color.component';
import { DateComponent } from './date/date.component';
import { MarkdownComponent } from './markdown/markdown.component';
import { DynaLabelDirective } from './dyna-label';

@NgModule({
  declarations: [
    DynamicFormComponent,
    TextComponent,
    TextareaComponent,
    RadioComponent,
    CheckboxComponent,
    CheckboxGroupComponent,
    DropdownComponent,
    FieldParentPipe,
    RelationSelectComponent,
    ActionComponent,
    RepeaterComponent,
    GroupComponent,
    ColorComponent,
    DateComponent,
    MarkdownComponent,
    DynaLabelDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule, DragDropModule, MatIconModule],
  exports: [DynamicFormComponent],
  providers: [DynamicFormService],
})
export class DynamicFormModule {}
