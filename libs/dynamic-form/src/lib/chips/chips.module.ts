import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from './chips.component';
import { DynaCommonModule } from '../common/dynamic-form.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChipsComponent],
  imports: [CommonModule, DynaCommonModule, ReactiveFormsModule, FormsModule],
  exports: [ChipsComponent],
})
export class ChipsModule {}
