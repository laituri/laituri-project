import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioComponent } from './radio.component';
import { DynaCommonModule } from '../common/dynamic-form.module';

@NgModule({
  declarations: [RadioComponent],
  exports: [RadioComponent],
  imports: [CommonModule, DynaCommonModule, ReactiveFormsModule],
})
export class RadioModule {}
