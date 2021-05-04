import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';
import { DynaCommonModule } from '../../common/common.module';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [CheckboxComponent],
  entryComponents: [CheckboxComponent],
  exports: [CheckboxComponent],
  imports: [
    CommonModule,
    DynaCommonModule,
    ReactiveFormsModule,
    MarkdownModule.forChild(),
  ],
})
export class CheckboxModule {}
