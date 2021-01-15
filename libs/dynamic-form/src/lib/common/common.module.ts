import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { DynaLabelDirective } from './label/dyna-label.directive';
import { HintDirective } from './hint/hint.directive';
import { DescriptionComponent } from './description/description.component';
import { InfoComponent } from './info/info.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayPositionStrategy } from './info/info-overlay-position.pipe';
@NgModule({
  declarations: [
    DynaLabelDirective,
    DescriptionComponent,
    HintDirective,
    InfoComponent,
    OverlayPositionStrategy,
  ],
  imports: [CommonModule, OverlayModule, MarkdownModule.forChild()],
  exports: [
    DynaLabelDirective,
    DescriptionComponent,
    HintDirective,
    InfoComponent,
  ],
})
export class DynaCommonModule {}
