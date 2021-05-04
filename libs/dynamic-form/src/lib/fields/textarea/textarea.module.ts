import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextareaComponent } from './textarea.component';
import { DynaCommonModule } from '../../common/common.module';

@NgModule({
  declarations: [TextareaComponent],
  entryComponents: [TextareaComponent],
  exports: [TextareaComponent],
  imports: [CommonModule, DynaCommonModule, ReactiveFormsModule],
})
export class TextareaModule {}
