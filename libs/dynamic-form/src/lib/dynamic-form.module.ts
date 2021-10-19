import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RepeaterComponent } from './fields/repeater/repeater.component';
import { GroupComponent } from './fields/group/group.component';
import { DynaCommonModule } from './common/common.module';
import {
  MarkdownModule as NgxMarkdownModule,
  MarkedOptions,
  MarkedRenderer,
} from 'ngx-markdown';
import { CoreModule } from './core/core.module';
import { DynaFieldsModule } from './fields/dyna-fields.module';
import { RepeaterDisplayFieldPipe } from './fields/repeater/repeater-display-field.pipe';

@NgModule({
  declarations: [
    DynamicFormComponent,
    RepeaterComponent,
    GroupComponent,
    RepeaterDisplayFieldPipe,
  ],
  entryComponents: [RepeaterComponent, GroupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    DragDropModule,
    DynaCommonModule,
    DynaFieldsModule,
    NgxMarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    }),
  ],
  exports: [DynamicFormComponent],
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
