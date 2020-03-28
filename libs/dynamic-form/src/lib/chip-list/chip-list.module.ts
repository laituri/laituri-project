import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipListComponent } from './chip-list.component';

@NgModule({
  declarations: [ChipListComponent],
  imports: [CommonModule],
  exports: [ChipListComponent],
})
export class ChipListModule {}
