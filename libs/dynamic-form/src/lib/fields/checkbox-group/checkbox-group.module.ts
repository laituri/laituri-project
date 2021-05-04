import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { DynaCommonModule } from '../../common/common.module';
import { IsCheckedPipe } from './checked.pipe';

@NgModule({
  declarations: [CheckboxGroupComponent, IsCheckedPipe],
  entryComponents: [CheckboxGroupComponent],
  exports: [CheckboxGroupComponent],
  imports: [CommonModule, DynaCommonModule, ReactiveFormsModule],
})
export class CheckboxGroupModule {}
