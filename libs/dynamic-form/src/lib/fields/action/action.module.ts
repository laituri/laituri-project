import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './action.component';
import { DynaCommonModule } from '../../common/common.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ActionComponent],

  exports: [ActionComponent],
  imports: [CommonModule, DynaCommonModule, ReactiveFormsModule],
})
export class ActionModule {}
