import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldConditionPipe } from './field-condition.pipe';
import { DynamicFormService } from './dynamic-form.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RepeaterComponent } from './repeater/repeater.component';
import { GroupComponent } from './group/group.component';
import { CheckboxModule } from './checkbox/checkbox.module';
import { CheckboxGroupModule } from './checkbox-group/checkbox-group.module';
import { ActionModule } from './action/action.module';
import { DynaCommonModule } from './common/dynamic-form.module';
import { TextModule } from './text/text.module';
import { TextareaModule } from './textarea/textarea.module';
import { RadioModule } from './radio/radio.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { RelationSelectModule } from './relation-select/relation-select.module';
import { ColorModule } from './color/color.module';
import { DateModule } from './date/date.module';
import { MarkdownModule } from './markdown/markdown.module';
import { ChipsModule } from './chips/chips.module';
import { InfoModule } from './info/info.module';
import { FileModule } from './file/file.module';

@NgModule({
  declarations: [
    DynamicFormComponent,
    FieldConditionPipe,
    RepeaterComponent,
    GroupComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    DynaCommonModule,
    CheckboxModule,
    CheckboxGroupModule,
    ActionModule,
    TextModule,
    TextareaModule,
    RadioModule,
    DropdownModule,
    RelationSelectModule,
    ColorModule,
    DateModule,
    MarkdownModule,
    ChipsModule,
    InfoModule,
    FileModule,
  ],
  exports: [DynamicFormComponent],
  providers: [DynamicFormService],
})
export class DynamicFormModule {}
