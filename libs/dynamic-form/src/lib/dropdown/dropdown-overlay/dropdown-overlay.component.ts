import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';
import { DropdownField, FieldOption } from '../../dynamic-form.types';

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

    if (!this.field.multiple) {
      // Toggle new value
      this.selectedOptions.next([option.key]);
      this.overlayRef.dispose();
    } else if (selected.find((key) => key === option.key)) {
      // Remove previous
      this.selectedOptions.next(selected.filter((key) => key !== option.key));
    } else {
      // Add new
      this.selectedOptions.next([...selected, option.key]);
    }
  }
}
