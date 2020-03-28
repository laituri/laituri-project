import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';
import { DynaCommonModule } from '../common/dynamic-form.module';

@NgModule({
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent],
  imports: [CommonModule, DynaCommonModule, ReactiveFormsModule],
})
export class CheckboxModule {}
