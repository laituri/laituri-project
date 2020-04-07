import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileComponent } from './file.component';
import { DropzoneDirective } from './dropzone.directive';
import { DropdownPreviewTextPipe } from './dropdown-preview-text.pipe';
import { DynaCommonModule } from '../common/dynamic-form.module';

@NgModule({
  declarations: [FileComponent, DropzoneDirective, DropdownPreviewTextPipe],
  imports: [CommonModule, DynaCommonModule],
  exports: [FileComponent],
})
export class FileModule {}
