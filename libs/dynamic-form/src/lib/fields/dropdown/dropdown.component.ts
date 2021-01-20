import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DynamicFormFieldBase } from '../../common/dynamic-form-field-base.class';
import { FieldOption } from '../../dynamic-form.types';
import { DropdownField } from './dropdown.types';

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

  @ViewChild('selectElement', { static: false })
  selectElement: ElementRef<HTMLButtonElement>;

  private subscriptions: Subscription[] = [];
  public selectedOptions = new BehaviorSubject<string[]>([]);
  public overlayOpen = false;

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

  public toggleDropdown() {
    this.overlayOpen = !this.overlayOpen;
  }

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
        this.overlayOpen = false;
      }
    } else if (!this.field.multiple) {
      // Add only new value
      this.selectedOptions.next([option.key]);
      this.overlayOpen = false;
    } else {
      // Add new
      this.selectedOptions.next([...selected, option.key]);
    }
  }
}
