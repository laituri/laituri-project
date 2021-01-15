import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorComponent } from './color.component';
import { DynaCommonModule } from '../../common/common.module';

@NgModule({
  declarations: [ColorComponent],
  entryComponents: [ColorComponent],
  exports: [ColorComponent],
  imports: [CommonModule, DynaCommonModule, ReactiveFormsModule],
})
export class ColorModule {}
