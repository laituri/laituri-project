import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitComponent } from './submit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynaCommonModule } from '../../common/common.module';

@NgModule({
  declarations: [SubmitComponent],

  imports: [CommonModule, DynaCommonModule, ReactiveFormsModule],
  exports: [SubmitComponent],
})
export class SubmitModule {}
