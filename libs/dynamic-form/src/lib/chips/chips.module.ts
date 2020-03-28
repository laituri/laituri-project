import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from './chips.component';
import { DynaCommonModule } from '../common/dynamic-form.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChipListModule } from '../chip-list/chip-list.module';

@NgModule({
  declarations: [ChipsComponent],
  imports: [
    CommonModule,
    DynaCommonModule,
    ReactiveFormsModule,
    FormsModule,
    ChipListModule,
  ],
  exports: [ChipsComponent],
})
export class ChipsModule {}
