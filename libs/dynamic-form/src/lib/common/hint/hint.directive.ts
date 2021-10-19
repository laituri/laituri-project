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

  @HostBinding('class.dyna-error-message') error = false;

  constructor(
    private el: ElementRef<HTMLElement>,
    private state: FormStateService,
  ) {}

  async ngOnInit() {
    const hint = await getHint(this.field);
    this.setText(hint);
    if (this.control) {
      this.control.statusChanges
        .pipe(debounceTime(500))
        .subscribe((status: 'VALID' | 'INVALID') => {
          if (status === 'VALID') {
            this.error = false;
            this.setText(hint);
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

    const globalErrorMessages = this.state.options.errorMessages;

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

// Helpers
export async function getHint(field: FieldTemplate): Promise<string> {
  if (field) {
    const { hint, key } = field;
    if (!hint || !key) {
      return '';
    }
    if (typeof hint === 'string') {
      return hint;
    }
    if (hint[key]) {
      return hint[key];
    }
    const defaultLocale = await this.state.getDefaultLocale();
    if (hint[defaultLocale.key]) {
      return hint[defaultLocale.key];
    }
  }
  return '';
}
