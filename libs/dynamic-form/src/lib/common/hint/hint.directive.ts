import {
  Directive,
  Input,
  ElementRef,
  OnInit,
  HostBinding,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { getErrorMessages as getErrorMessage } from '../validation-errors';
import { ErrorMessages, FieldTemplate } from '../../dynamic-form.types';
import { FormStateService } from '../../core/form-state.service';

@Directive({
  selector: 'dyna-hint',
})
export class HintDirective implements OnInit {
  @Input() control: AbstractControl;
  @Input() field: FieldTemplate;
  @Input() hint: string;

  @HostBinding('class.dyna-error-message') error = false;

  constructor(
    private el: ElementRef<HTMLElement>,
    private state: FormStateService,
  ) {}

  ngOnInit() {
    if (this.control) {
      this.control.statusChanges
        .pipe(debounceTime(500))
        .subscribe((status: 'VALID' | 'INVALID') => {
          if (status === 'VALID') {
            this.error = false;
            this.setText(this.hint || this.field.hint || '');
          }
          if (status === 'INVALID') {
            this.error = true;
            const errorMessages = this.getErrorMessages();
            const errorMessage = getErrorMessage(
              this.control.errors,
              errorMessages,
            );
            this.setText(errorMessage);
          }
        });
    }
  }

  private setText(text: string) {
    this.el.nativeElement.innerText = text;
  }

  private getErrorMessages(): ErrorMessages {
    const fieldErrorMessages =
      this.field.validation && this.field.validation.errorMessages;

    const globalErrorMessages = this.state.inputs.getErrorMessages();

    if (fieldErrorMessages) {
      if (globalErrorMessages) {
        return {
          ...globalErrorMessages,
          ...fieldErrorMessages,
        };
      }
      return fieldErrorMessages;
    }
    if (globalErrorMessages) {
      return globalErrorMessages;
    }
    return null;
  }
}
