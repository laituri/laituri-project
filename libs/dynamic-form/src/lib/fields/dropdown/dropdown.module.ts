import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './dropdown.component';
import { DynaCommonModule } from '../../common/common.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { DropdownInputValuePipe } from './dropdown-input-value.pipe';
import { ChipListModule } from '../../components/chip-list/chip-list.module';
import { A11yModule } from '@angular/cdk/a11y';
@NgModule({
  declarations: [DropdownComponent, DropdownInputValuePipe],
  exports: [DropdownComponent],
  entryComponents: [DropdownComponent],
  imports: [
    CommonModule,
    DynaCommonModule,
    ReactiveFormsModule,
    OverlayModule,
    ChipListModule,
    A11yModule,
  ],
})
export class DropdownModule {}
