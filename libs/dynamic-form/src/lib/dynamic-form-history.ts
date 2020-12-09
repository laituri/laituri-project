import { FormGroup } from '@angular/forms';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormValues } from './dynamic-form.types';

export class DynamicFormHistory {
  private history = [];
  private checkedIndex = -1;
  private currentIndex = -1;

  constructor() {}

  public historyKeyboardEvents(): Observable<'undo' | 'redo' | undefined> {
    return this.keyboardEventsFactory();
  }

  public pushToHistory(values: FormValues) {
    if (this.history.length >= 64) {
      this.history.splice(0, 1);
    }
    // If values were changes because of undo
    if (this.checkedIndex !== this.currentIndex) {
      this.checkedIndex = this.currentIndex;
    } else {
      // Add new values
      const newIndex = this.currentIndex + 1;
      this.history[newIndex] = values;
      this.history = this.history.slice(0, newIndex + 1);
      this.checkedIndex = newIndex;
      this.currentIndex = newIndex;
    }
  }

  public undo(form: FormGroup) {
    if (this.currentIndex - 1 > -1) {
      const previous = this.history[this.currentIndex - 1];
      form.patchValue(previous);
      this.currentIndex -= 1;
    }
  }

  public redo(form: FormGroup) {
    if (this.currentIndex + 1 < this.history.length) {
      const next = this.history[this.currentIndex + 1];
      form.patchValue(next);
      this.currentIndex += 1;
    }
  }

  private keyboardEventsFactory(): Observable<'undo' | 'redo' | undefined> {
    return fromEvent(document, 'keydown').pipe(
      map((e: KeyboardEvent) => {
        if (e.code === 'KeyZ' && e.ctrlKey && !e.shiftKey) {
          e.preventDefault();
          return 'undo';
        }
        if (e.code === 'KeyZ' && e.ctrlKey && e.shiftKey) {
          e.preventDefault();
          return 'redo';
        }
        return undefined;
      }),
    );
  }
}
