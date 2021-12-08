import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownTextSectionComponent } from './markdown-text-section.component';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [MarkdownTextSectionComponent],

  imports: [CommonModule, MarkdownModule.forChild()],
  exports: [MarkdownTextSectionComponent],
})
export class MarkdownTextSectionModule {}
