import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { DropdownOverlayComponent } from './dropdown-overlay/dropdown-overlay.component';
import { DropdownService } from './dropdown.service';
import { skip, startWith, filter, map } from 'rxjs/operators';
import { DynamicFormFieldBase } from '../dynamic-form-field-base.class';
import { DropdownField, FieldOption } from '../dynamic-form.types';

@Component({
  selector: 'dyna-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent extends DynamicFormFieldBase implements OnInit {
  @Input()
  field: DropdownField;
  @Input()
  control: AbstractControl;

  @ViewChild('selectElement', { static: false }) selectElement: ElementRef<
    HTMLButtonElement
  >;
  private overlayRef: OverlayRef;
  private subscriptions: Subscription[];
  public selected: BehaviorSubject<FieldOption[]>;

  constructor(
    private overlay: Overlay,
    private dropdownService: DropdownService,
  ) {
    super();
  }

  ngOnInit() {
    this.dropdownService.setField(this.field);
    this.selected = this.dropdownService.getSelected();
    const selectedSubscription = this.selected
      .pipe(skip(1))
      .subscribe((selected) => this.setValue(selected));
    this.subscriptions = [selectedSubscription];
  }

  private contructValue(selected: FieldOption[]) {
    const { output, multiple } = this.field;
    switch (output) {
      /* Boolean map */
      case 'boolean-map':
        const selectedKeys = selected.map((op) => op.key);
        const allKeys = this.field.options.map((op) => op.key);
        return allKeys.reduce((acc, key) => {
          acc[key] = selectedKeys.includes(key);
          return acc;
        }, {} as { [key: string]: boolean });

      /* Data array */
      case 'data':
        return multiple
          ? selected.map((op) => op.data)
          : selected.map((op) => op.data)[0];

      /* Key array */
      default:
        return multiple
          ? selected.map((op) => op.key)
          : selected.map((op) => op.key)[0];
    }
  }

  private setValue(selected: FieldOption[]) {
    if (!this.control.disabled) {
      const value = this.contructValue(selected);
      this.control.setValue(value);
    }
  }

  public openDropdown() {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.selectElement)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
        ]),
    });
    this.dropdownService.setOverlayRef(this.overlayRef);
    const userProfilePortal = new ComponentPortal(DropdownOverlayComponent);
    this.overlayRef.attach(userProfilePortal);
    const backdropSubscription = this.overlayRef
      .backdropClick()
      .subscribe(() => this.overlayRef.dispose());
    this.subscriptions.push(backdropSubscription);
  }
}
