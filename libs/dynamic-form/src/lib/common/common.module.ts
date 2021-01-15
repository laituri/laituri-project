import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { DynaLabelDirective } from './label/dyna-label.directive';
import { HintDirective } from './hint/hint.directive';
import { DescriptionComponent } from './description/description.component';

@NgModule({
  declarations: [DynaLabelDirective, DescriptionComponent, HintDirective],
  imports: [CommonModule, MarkdownModule.forChild()],
  exports: [DynaLabelDirective, DescriptionComponent, HintDirective],
})
export class DynaCommonModule {}
