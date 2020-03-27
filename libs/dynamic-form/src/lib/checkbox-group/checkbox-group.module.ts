import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { DynaCommonModule } from '../common/dynamic-form.module';

@NgModule({
  declarations: [CheckboxGroupComponent],
  exports: [CheckboxGroupComponent],
  imports: [CommonModule, DynaCommonModule, ReactiveFormsModule],
})
export class CheckboxGroupModule {}
