import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileComponent } from './file.component';
import { DropzoneDirective } from './dropzone.directive';
import { DropdownPreviewTextPipe } from './dropdown-preview-text.pipe';
import { DynaCommonModule } from '../../common/common.module';
import { DropdownPreviewSizePipe } from './dropdown-preview-size.pipe';

@NgModule({
  declarations: [
    FileComponent,
    DropzoneDirective,
    DropdownPreviewTextPipe,
    DropdownPreviewSizePipe,
  ],

  imports: [CommonModule, DynaCommonModule],
  exports: [FileComponent],
})
export class FileModule {}
