import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynaLabelDirective } from './dyna-label';

@NgModule({
  declarations: [DynaLabelDirective],
  imports: [CommonModule],
  exports: [DynaLabelDirective],
})
export class DynaCommonModule {}
