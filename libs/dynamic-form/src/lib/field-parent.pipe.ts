import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  map,
  tap,
  startWith,
  scan,
  distinctUntilChanged,
} from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Pipe({
  name: 'fieldParent',
})
export class FieldParentPipe implements PipeTransform {
  transform({ parent, key }: Field, form: FormGroup): Observable<boolean> {
    if (!parent || !form) {
      return null;
    }

    const group = parent.fromParent ? form.parent || form : form;

    if (!group.get(parent.key)) {
      console.log('No parent found!');
      return null;
    }

    const parentControl = group.get(parent.key);

    return parentControl.valueChanges.pipe(
      startWith(parentControl.value),
      distinctUntilChanged(),
      map(value => {
        if (typeof parent.values === 'boolean') {
          return !parent.values === value;
        }
        if (Array.isArray(parent.values)) {
          return !parent.values.includes(value);
        }
        console.error('Can not define something');
        return true;
      }),
      distinctUntilChanged(),
      tap(bool => {
        if (bool) {
          form.get(key).reset();
        }
      }),
    );

    /*     return group.get(field.parent.key).valueChanges.pipe(
      map((value: string | string[]) => !value.includes(field.parent.value)),
      startWith(
        !(
          group.get(field.parent.key).value &&
          group.get(field.parent.key).value.includes(field.parent.value)
        ),
      ),
      scan((acc, cur) => {
        if (field.type === 'repeater' || field.type === 'map') {
          return cur;
        }
        return this.clearValue(acc, cur, form, field);
      }, group.get(field.parent.key).value && !group.get(field.parent.key).value.includes(field.parent.value)),
    ); */
  }

  clearValue(acc, cur, form: FormGroup, field) {
    if (!form || !field || !form.get(field.key)) {
      return cur;
    }
    if (acc !== cur && cur) {
      form.get(field.key).setValue('');
      form.get(field.key).markAsUntouched();
    }
    form.get(field.key).updateValueAndValidity({ onlySelf: true });
    return cur;
  }
}
