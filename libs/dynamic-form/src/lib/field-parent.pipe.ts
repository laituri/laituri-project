import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  map,
  tap,
  startWith,
  scan,
  distinctUntilChanged,
} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Field, FieldTemplate } from './dynamic-form.types';

@Pipe({
  name: 'fieldParent',
})
export class FieldParentPipe implements PipeTransform {
  transform(
    { condition, key }: FieldTemplate,
    form: FormGroup,
  ): Observable<boolean> {
    if (!condition || !form) {
      return null;
    }

    const group = condition.fromParent ? form.parent || form : form;

    if (!group.get(condition.key)) {
      console.log('No parent found!');
      return null;
    }

    const parentControl = group.get(condition.key);

    return parentControl.valueChanges.pipe(
      startWith(parentControl.value),
      distinctUntilChanged(),
      map((value) => {
        if (!condition.values && typeof condition.values !== 'boolean') {
          return !value;
        }
        if (typeof condition.values === 'boolean') {
          return !condition.values === value;
        }
        if (Array.isArray(condition.values)) {
          return !condition.values.includes(value);
        }
        console.error('Can not define something');
        return true;
      }),
      distinctUntilChanged(),
      tap((bool) => {
        if (key && bool) {
          form.get(key).reset();
        }
      }),
    );
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
