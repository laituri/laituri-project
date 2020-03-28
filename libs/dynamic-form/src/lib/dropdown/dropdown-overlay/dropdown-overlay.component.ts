import { Component, OnInit } from '@angular/core';
import { DropdownService } from '../dropdown.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';
import { map } from 'rxjs/operators';

@Component({
  selector: 'dyna-dropdown-overlay',
  templateUrl: './dropdown-overlay.component.html',
  styleUrls: ['./dropdown-overlay.component.scss'],
})
export class DropdownOverlayComponent implements OnInit {
  private overlayRef: OverlayRef;
  public field: DropdownField;
  public selectedKeys: Observable<string[]>;
  constructor(private dropdownService: DropdownService) {}

  ngOnInit(): void {
    this.field = this.dropdownService.getField();
    this.overlayRef = this.dropdownService.getOverlayRef();
    this.selectedKeys = this.dropdownService
      .getSelected()
      .pipe(map(options => (options ? options.map(op => op.key) : [])));
  }

  select(option: FieldOption) {
    if (this.field.multiple) {
      this.dropdownService.toggleItem(option);
    } else {
      this.dropdownService.setSelected([option]);
      this.overlayRef.dispose();
    }
  }
}
