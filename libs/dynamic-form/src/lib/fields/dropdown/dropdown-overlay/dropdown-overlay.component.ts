import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';
import { DropdownField } from '../dropdown.types';
import { FieldOption } from '../../../dynamic-form.types';

@Component({
  selector: 'dyna-dropdown-overlay',
  templateUrl: './dropdown-overlay.component.html',
  styleUrls: ['./dropdown-overlay.component.scss'],
})
export class DropdownOverlayComponent implements OnInit {
  public overlayRef: OverlayRef;
  public field: DropdownField;
  public selectedOptions: BehaviorSubject<string[]>;
  constructor() {}

  ngOnInit(): void {}

  public select(option: FieldOption) {
    const selected = this.selectedOptions.value;
    const alreadySelected = selected.find((key) => key === option.key);
    if (alreadySelected) {
      // Remove already selected
      this.selectedOptions.next(selected.filter((key) => key !== option.key));
      // On removal dispose if not a multiselect or is not required
      if (
        !this.field.multiple &&
        (!this.field.validation || !this.field.validation.required)
      ) {
        this.overlayRef.dispose();
      }
    } else if (!this.field.multiple) {
      // Add only new value
      this.selectedOptions.next([option.key]);
      this.overlayRef.dispose();
    } else {
      // Add new
      this.selectedOptions.next([...selected, option.key]);
    }
  }
}
