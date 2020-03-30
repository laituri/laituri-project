import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynaLabelDirective } from './dyna-label.directive';
import { ValidationHintDirective } from './validation-hint.directive';

@NgModule({
  declarations: [DynaLabelDirective, ValidationHintDirective],
  imports: [CommonModule],
  exports: [DynaLabelDirective, ValidationHintDirective],
})
export class DynaCommonModule {}
