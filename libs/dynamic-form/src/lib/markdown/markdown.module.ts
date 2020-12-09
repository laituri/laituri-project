import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownComponent } from './markdown.component';
import { DynaCommonModule } from '../common/dynamic-form.module';

@NgModule({
  declarations: [MarkdownComponent],
  entryComponents: [MarkdownComponent],
  exports: [MarkdownComponent],
  imports: [CommonModule, DynaCommonModule, ReactiveFormsModule],
})
export class MarkdownModule {}
