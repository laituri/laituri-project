import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './dropdown.component';
import { DynaCommonModule } from '../common/dynamic-form.module';

@NgModule({
  declarations: [DropdownComponent],
  exports: [DropdownComponent],
  imports: [CommonModule, DynaCommonModule, ReactiveFormsModule],
})
export class DropdownModule {}
