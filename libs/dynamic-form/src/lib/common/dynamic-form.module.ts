import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynaLabelDirective } from './dyna-label.directive';
import { ValidationHintDirective } from './validation-hint.directive';
import { DynaDescriptionComponent } from './dyna-description/dyna-description.component';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    DynaLabelDirective,
    ValidationHintDirective,
    DynaDescriptionComponent,
  ],
  imports: [CommonModule, MarkdownModule.forRoot()],
  exports: [
    DynaLabelDirective,
    ValidationHintDirective,
    DynaDescriptionComponent,
  ],
})
export class DynaCommonModule {}
