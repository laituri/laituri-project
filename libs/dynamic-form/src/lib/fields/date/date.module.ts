import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DateComponent } from './date.component';
import { DynaCommonModule } from '../../common/common.module';

@NgModule({
  declarations: [DateComponent],

  exports: [DateComponent],
  imports: [CommonModule, DynaCommonModule, ReactiveFormsModule],
})
export class DateModule {}
