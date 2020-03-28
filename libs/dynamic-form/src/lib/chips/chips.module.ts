import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from './chips.component';
import { DynaCommonModule } from '../common/dynamic-form.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChipListModule } from '../chip-list/chip-list.module';
import { GenerateChipsPipe } from './generate-chips.pipe';

@NgModule({
  declarations: [ChipsComponent, GenerateChipsPipe],
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
