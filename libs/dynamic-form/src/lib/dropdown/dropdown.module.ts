import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './dropdown.component';
import { DynaCommonModule } from '../common/dynamic-form.module';
import { DropdownOverlayComponent } from './dropdown-overlay/dropdown-overlay.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { DropdownInputValuePipe } from './dropdown-input-value.pipe';
import { DropdownOptionSelectedPipe } from './dropdown-overlay/dropdown-option-selected.pipe';
import { ChipListModule } from '../chip-list/chip-list.module';

@NgModule({
  declarations: [
    DropdownComponent,
    DropdownOverlayComponent,
    DropdownInputValuePipe,
    DropdownOptionSelectedPipe,
  ],
  exports: [DropdownComponent],
  entryComponents: [DropdownOverlayComponent],
  imports: [
    CommonModule,
    DynaCommonModule,
    ReactiveFormsModule,
    OverlayModule,
    ChipListModule,
  ],
})
export class DropdownModule {}
