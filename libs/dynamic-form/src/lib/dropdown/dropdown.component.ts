import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { Subscription, BehaviorSubject, Observable, pipe } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { DropdownOverlayComponent } from './dropdown-overlay/dropdown-overlay.component';
import { first, map } from 'rxjs/operators';
import { DynamicFormFieldBase } from '../dynamic-form-field-base.class';
import { DropdownField, FieldOption } from '../dynamic-form.types';

@Component({
  selector: 'dyna-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent
  extends DynamicFormFieldBase
  implements OnInit, OnDestroy {
  @Input()
  field: DropdownField;
  @Input()
  control: AbstractControl;

  @ViewChild('selectElement', { static: false }) selectElement: ElementRef<
    HTMLButtonElement
  >;
  private overlayRef: OverlayRef;
  private subscriptions: Subscription[] = [];
  public selectedOptions = new BehaviorSubject<string[]>([]);

  constructor(private overlay: Overlay) {
    super();
  }

  ngOnInit() {
    const selectedOptions = this.getSelectedOptionKeysFromValue(
      this.control.value,
    );
    this.selectedOptions.next(selectedOptions);
    const selectedChangeSubscription = this.getSelectedOptions().subscribe(
      (options) => {
        this.setValue(options);
      },
    );

    this.subscriptions.push(selectedChangeSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      try {
        subscription.unsubscribe();
      } catch (error) {}
    });
  }

  public getSelectedOptions(): Observable<FieldOption[]> {
    return this.selectedOptions.pipe(
      map((keys) =>
        this.field.options.filter((option) => keys.includes(option.key)),
      ),
    );
  }

  private getSelectedOptionKeysFromValue(value: any): string[] {
    if (!value) {
      return [];
    }
    if (Array.isArray(value)) {
      // Array of keys
      if (
        value.every((val) => typeof val === 'string' || typeof val === 'number')
      ) {
        return value;
      }
      // Array of options, return keys
      if (value.every((val) => val.key)) {
        return value.map((val) => val.key);
      }
    }
    if (typeof value === 'object') {
      // Boolean map, return keys
      return Object.keys(value).filter((key) => {
        const val = value[key];
        return val;
      });
    }
    if (typeof value === 'string') {
      return [value];
    }
    return [];
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
          ? selected.map((op) => ({ [op.key]: op.data }))
          : selected.map((op) => ({ [op.key]: op.data }))[0];

      /* Key array or single key */
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

    const portal = new ComponentPortal(DropdownOverlayComponent);
    const { instance } = this.overlayRef.attach(portal);
    instance.overlayRef = this.overlayRef;
    instance.field = this.field;
    instance.selectedOptions = this.selectedOptions;
    /* Close */
    const closeSubsciption = this.overlayRef
      .detachments()
      .pipe(first())
      .subscribe(() => {
        this.overlayRef = null;
      });

    this.subscriptions.push(closeSubsciption);

    const backdropSubscription = this.overlayRef
      .backdropClick()
      .subscribe(() => this.overlayRef.dispose());
    this.subscriptions.push(backdropSubscription);
  }
}
