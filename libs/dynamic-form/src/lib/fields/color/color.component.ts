import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import Pickr from '@simonwep/pickr';
import { AbstractControl } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DynamicFormFieldBase } from '../../common/dynamic-form-field-base.class';
import { ColorField } from './color.types';

const defaultColors = {
  hex: '#0889DA',
  rgba: 'rgb(100,100,100)',
};

@Component({
  selector: 'dyna-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent
  extends DynamicFormFieldBase
  implements OnInit, OnDestroy
{
  @Input()
  field: ColorField;
  @Input()
  control: AbstractControl;

  private picker: Pickr;
  private colorSet: boolean;

  private subscriptions: Subscription[];

  @ViewChild('inputFieldElement', { static: true })
  inputFieldElement: ElementRef<HTMLInputElement>;
  @ViewChild('pickerElement', { static: true })
  pickerElement: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    const { output, swatches, opacity } = this.field;

    this.picker = Pickr.create({
      el: this.pickerElement.nativeElement,
      theme: 'nano', // or 'monolith', or 'nano'
      default: this.control.value || defaultColors[output],
      swatches,
      lockOpacity: !opacity,
      components: {
        // Main components
        opacity: opacity !== undefined ? opacity : true,
        preview: true,
        hue: true,

        // Input / output Options
        interaction: {
          input: true,
          save: true,
        },
      },

      i18n: {
        'btn:save': 'Save color',
      },
    });
    this.picker.on('show', (color: Pickr.HSVaColor, instance: Pickr) => {
      this.colorSet = false;
    });
    this.picker.on('save', (color: Pickr.HSVaColor, instance: Pickr) => {
      this.setValue(color);
      this.colorSet = true;
      instance.hide();
    });
    this.picker.on('change', (color: Pickr.HSVaColor, instance: Pickr) => {
      this.setValue(color);
    });
    this.picker.on('hide', (instance: Pickr) => {
      if (!this.colorSet) {
        instance.setColor(this.control.value || '');
        this.colorSet = true;
      }
    });

    const inputTypingSubscription: Subscription = fromEvent(
      this.inputFieldElement.nativeElement,
      'keyup',
    )
      .pipe(debounceTime(1000))
      .subscribe(() => {
        try {
          this.picker.setColor(this.control.value);
        } catch (error) {
          console.error('invalid color input');
        }
      });

    this.subscriptions = [inputTypingSubscription];
  }

  private setValue(color: Pickr.HSVaColor) {
    if (!this.control.disabled) {
      switch (this.field.output) {
        case 'rgba':
          this.control.setValue(color.toRGBA().toString(0));
          break;

        default:
          this.control.setValue(color.toHEXA().toString());
          break;
      }
    }
  }
  ngOnDestroy() {
    this.picker.off('save', () => {});
    this.picker.off('change', () => {});
    this.picker.off('hide', () => {});

    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
