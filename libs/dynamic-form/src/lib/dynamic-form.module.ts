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
import { ChipsModule } from './fields/chips/chips.module';
import { FileModule } from './fields/file/file.module';
import { DynamicFormComponentsFactoryDirective } from './core/dynamic-form-components.directive';
import { SubmitModule } from './fields/submit/submit.module';
import {
  MarkdownModule as NgxMarkdownModule,
  MarkedOptions,
  MarkedRenderer,
} from 'ngx-markdown';
import { MarkdownEditorModule } from './fields/markdown-editor/markdown-editor.module';
import { MarkdownTextSectionModule } from './fields/markdown-text-section/markdown-text-section.module';
import { FormStateService } from './core/form-state.service';

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
    NgxMarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    }),
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
    MarkdownEditorModule,
    MarkdownTextSectionModule,
  ],
  exports: [DynamicFormComponent],
  providers: [FormStateService],
})
export class DynamicFormModule {}

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.link = (href: string, title: string, text: string) => {
    if (href.startsWith('/')) {
      return `<a title=${title} href="${href}">${text}</a>`;
    }
    return `<a title=${title} href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  };
  return {
    renderer: renderer,
  };
}
