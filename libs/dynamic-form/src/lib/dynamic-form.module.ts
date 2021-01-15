import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldConditionPipe } from './core/field-condition.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RepeaterComponent } from './fields/repeater/repeater.component';
import { GroupComponent } from './fields/group/group.component';
import { CheckboxModule } from './fields/checkbox/checkbox.module';
import { CheckboxGroupModule } from './fields/checkbox-group/checkbox-group.module';
import { ActionModule } from './fields/action/action.module';
import { DynaCommonModule } from './common/common.module';
import { TextModule } from './fields/text/text.module';
import { TextareaModule } from './fields/textarea/textarea.module';
import { RadioModule } from './fields/radio/radio.module';
import { DropdownModule } from './fields/dropdown/dropdown.module';
import { ColorModule } from './fields/color/color.module';
import { DateModule } from './fields/date/date.module';
import { MarkdownModule } from './fields/markdown/markdown.module';
import { ChipsModule } from './fields/chips/chips.module';
import { InfoModule } from './fields/info/info.module';
import { FileModule } from './fields/file/file.module';
import { DynamicFormComponentsFactoryDirective } from './core/dynamic-form-components.directive';
import { SubmitModule } from './fields/submit/submit.module';
import { MarkdownModule as NgxMarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    DynamicFormComponent,
    FieldConditionPipe,
    RepeaterComponent,
    GroupComponent,
    DynamicFormComponentsFactoryDirective,
  ],
  entryComponents: [RepeaterComponent, GroupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    DynaCommonModule,
    NgxMarkdownModule.forRoot(),
    /* Component modules */
    CheckboxModule,
    CheckboxGroupModule,
    ActionModule,
    TextModule,
    TextareaModule,
    RadioModule,
    DropdownModule,
    ColorModule,
    DateModule,
    MarkdownModule,
    ChipsModule,
    InfoModule,
    FileModule,
    SubmitModule,
  ],
  exports: [DynamicFormComponent],
})
export class DynamicFormModule {}
