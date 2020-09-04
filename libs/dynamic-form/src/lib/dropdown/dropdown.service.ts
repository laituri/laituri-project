import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';
import { DropdownField, FieldOption } from '../dynamic-form.types';

@Injectable()
export class DropdownService {
  private field: DropdownField;
  private overlayRef: OverlayRef;
  private selected = new BehaviorSubject<FieldOption[]>(null);

  constructor() {}

  public setField(field: DropdownField) {
    this.field = field;
  }

  public getField(): DropdownField {
    return this.field;
  }

  public setSelected(selected: FieldOption[]) {
    this.selected.next(selected);
  }
  public toggleItem(item: FieldOption) {
    const selected = this.selected.value;
    if (Array.isArray(selected)) {
      if (selected.find((s1) => s1.key === item.key)) {
        this.setSelected(selected.filter((s2) => s2.key !== item.key));
      } else {
        this.setSelected([...selected, item]);
      }
    } else {
      this.setSelected([item]);
    }
  }

  public getSelected(): BehaviorSubject<FieldOption[]> {
    return this.selected;
  }

  public setOverlayRef(overlayRef: OverlayRef) {
    this.overlayRef = overlayRef;
  }

  public getOverlayRef(): OverlayRef {
    return this.overlayRef;
  }
}
