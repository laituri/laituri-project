import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { DynamicFormComponentsService } from '../core/dynamic-form-components.service';
import { DynamicFormFieldComponentConfig } from '../dynamic-form.types';
import { ActionComponentConfig } from './action/action.config';
import { ActionModule } from './action/action.module';
import { CheckboxGroupComponentConfig } from './checkbox-group/checkbox-group.config';
import { CheckboxGroupModule } from './checkbox-group/checkbox-group.module';
import { CheckboxComponentConfig } from './checkbox/checkbox.config';
import { CheckboxModule } from './checkbox/checkbox.module';
import { ChipsComponentConfig } from './chips/chips.config';
import { ChipsModule } from './chips/chips.module';
import { ColorComponentConfig } from './color/color.config';
import { ColorModule } from './color/color.module';
import { DateComponentConfig } from './date/date.config';
import { DateModule } from './date/date.module';
import { DropdownComponentConfig } from './dropdown/dropdown.config';
import { DropdownModule } from './dropdown/dropdown.module';
import { FileComponentConfig } from './file/file.config';
import { FileModule } from './file/file.module';
import {
  GroupComponentConfig,
  ContantainerComponentConfig,
} from './group/group.config';
import {
  MarkdownTextSectionComponentConfig,
  MarkdownTextSectionComponentAsInfoConfig,
} from './markdown-text-section/markdown-text-section.config';
import { MarkdownTextSectionModule } from './markdown-text-section/markdown-text-section.module';
import { RadioComponentConfig } from './radio/radio.config';
import { RadioModule } from './radio/radio.module';
import { RepeaterComponentConfig } from './repeater/repeater.config';
import { SubmitComponentConfig } from './submit/submit.config';
import { SubmitModule } from './submit/submit.module';
import { TextComponentConfigs } from './text/text.config';
import { TextModule } from './text/text.module';
import {
  TextareaComponentConfig,
  TextareaMarkdownEditorComponentConfig,
  TextareaMarkdownEditorComponentAsMarkdownConfig,
} from './textarea/textarea.config';
import { TextareaModule } from './textarea/textarea.module';

@NgModule({
  declarations: [],
  providers: [],
  imports: [
    CoreModule,

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
    ChipsModule,
    FileModule,
    SubmitModule,
    MarkdownTextSectionModule,
  ],
  exports: [],
})
export class DynaFieldsModule {
  /* Components */
  private components: DynamicFormFieldComponentConfig[] = [
    ...TextComponentConfigs,
    TextareaComponentConfig,
    RepeaterComponentConfig,
    GroupComponentConfig,
    ContantainerComponentConfig,
    ActionComponentConfig,
    CheckboxComponentConfig,
    CheckboxGroupComponentConfig,
    ChipsComponentConfig,
    ColorComponentConfig,
    DateComponentConfig,
    DropdownComponentConfig,
    FileComponentConfig,
    MarkdownTextSectionComponentConfig,
    MarkdownTextSectionComponentAsInfoConfig,
    TextareaMarkdownEditorComponentConfig,
    TextareaMarkdownEditorComponentAsMarkdownConfig,
    RadioComponentConfig,
    SubmitComponentConfig,
  ];

  constructor(private componentsService: DynamicFormComponentsService) {
    this.componentsService.registerComponents(this.components);
  }
}
