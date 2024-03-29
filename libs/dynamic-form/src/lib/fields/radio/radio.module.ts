import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioComponent } from './radio.component';
import { DynaCommonModule } from '../../common/common.module';
import { IsCheckedPipe } from './checked.pipe';

@NgModule({
  declarations: [RadioComponent, IsCheckedPipe],

  exports: [RadioComponent],
  imports: [CommonModule, DynaCommonModule, ReactiveFormsModule],
})
export class RadioModule {}
