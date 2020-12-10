import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitComponent } from './submit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynaCommonModule } from '../common/dynamic-form.module';

@NgModule({
  declarations: [SubmitComponent],
  entryComponents: [SubmitComponent],
  imports: [CommonModule, DynaCommonModule, ReactiveFormsModule],
  exports: [SubmitComponent],
})
export class SubmitModule {}
