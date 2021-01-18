import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownEditorComponent } from './markdown-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynaCommonModule } from '../../common/common.module';

@NgModule({
  declarations: [MarkdownEditorComponent],
  imports: [CommonModule, DynaCommonModule, ReactiveFormsModule],
  exports: [MarkdownEditorComponent],
  entryComponents: [MarkdownEditorComponent],
})
export class MarkdownEditorModule {}
