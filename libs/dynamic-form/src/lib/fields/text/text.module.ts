import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextComponent } from './text.component';
import { DynaCommonModule } from '../../common/common.module';

@NgModule({
  declarations: [TextComponent],
  entryComponents: [TextComponent],
  exports: [TextComponent],
  imports: [CommonModule, ReactiveFormsModule, DynaCommonModule],
})
export class TextModule {}
