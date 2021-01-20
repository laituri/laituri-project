import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './dropdown.component';
import { DynaCommonModule } from '../../common/common.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { DropdownInputValuePipe } from './dropdown-input-value.pipe';
import { DropdownOptionSelectedPipe } from './dropdown-option-selected.pipe';
import { ChipListModule } from '../../components/chip-list/chip-list.module';

@NgModule({
  declarations: [
    DropdownComponent,
    DropdownInputValuePipe,
    DropdownOptionSelectedPipe,
  ],
  exports: [DropdownComponent],
  entryComponents: [DropdownComponent],
  imports: [
    CommonModule,
    DynaCommonModule,
    ReactiveFormsModule,
    OverlayModule,
    ChipListModule,
  ],
})
export class DropdownModule {}
