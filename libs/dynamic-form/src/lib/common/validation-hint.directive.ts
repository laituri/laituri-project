import {
  Directive,
  Input,
  ElementRef,
  OnInit,
  HostBinding,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { getErrorMessages } from './validation-errors';
import { Field } from '../dynamic-form.types';

@Directive({
  selector: 'dyna-hint',
})
export class ValidationHintDirective implements OnInit {
  @Input() control: AbstractControl;
  @Input() field: Field;
  @Input() hint: string;

  @HostBinding('class.dyna-error-message') error = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.control.statusChanges
      .pipe(debounceTime(500))
      .subscribe((status: 'VALID' | 'INVALID') => {
        if (status === 'VALID') {
          this.error = false;
          this.setText(this.hint || this.field.hint || '');
        }
        if (status === 'INVALID') {
          this.error = true;
          const errorMessage = getErrorMessages(this.control.errors);
          this.setText(errorMessage);
        }
      });
  }

  setText(text: string) {
    this.el.nativeElement.innerText = text;
  }
}
