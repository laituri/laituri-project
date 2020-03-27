import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RelationSelectComponent } from './relation-select.component';
import { DynaCommonModule } from '../common/dynamic-form.module';

@NgModule({
  declarations: [RelationSelectComponent],
  exports: [RelationSelectComponent],
  imports: [CommonModule, DynaCommonModule, ReactiveFormsModule],
})
export class RelationSelectModule {}
