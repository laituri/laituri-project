import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipListComponent } from './chip-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [ChipListComponent],
  imports: [CommonModule, DragDropModule],
  exports: [ChipListComponent],
})
export class ChipListModule {}
