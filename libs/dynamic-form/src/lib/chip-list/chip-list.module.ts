import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipListComponent } from './chip-list.component';
import { SortablejsModule } from 'ngx-sortablejs';

@NgModule({
  declarations: [ChipListComponent],
  imports: [CommonModule, SortablejsModule],
  exports: [ChipListComponent],
})
export class ChipListModule {}
