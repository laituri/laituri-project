import { Pipe, PipeTransform } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { map, tap, startWith, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FieldTemplate } from '../dynamic-form.types';

@Pipe({
  name: 'fieldCondition',
})
export class FieldConditionPipe implements PipeTransform {
  transform(
    { condition, key }: FieldTemplate,
    form: UntypedFormGroup,
  ): Observable<boolean> {
    if (!condition || !form) {
      return null;
    }

    const group = condition.fromParent ? form.parent || form : form;

    const parentControl = group.get(condition.key);

    if (!parentControl) {
      console.log('No parent found!');
      return null;
    }

    /* Note: return false to show the field! */
    return parentControl.valueChanges.pipe(
      startWith(parentControl.value),
      distinctUntilChanged(),
      map((fieldValue) => {
        const valueIsObject = fieldValue && typeof fieldValue === 'object';
        const actualValue =
          valueIsObject && condition.objectKey
            ? fieldValue[condition.objectKey]
            : fieldValue;

        if (!condition.values && typeof condition.values !== 'boolean') {
          return !actualValue;
        }
        if (typeof condition.values === 'boolean') {
          return !condition.values === actualValue;
        }
        if (Array.isArray(condition.values)) {
          if (Array.isArray(actualValue)) {
            return !condition.values.find((val) => actualValue.includes(val));
          }
          return !condition.values.includes(actualValue);
        }
        console.error('Can not define something');
        return true;
      }),
      distinctUntilChanged(),
      tap((hide) => {
        if (key && hide && form.get(key)) {
          form.get(key).reset();
        }
      }),
    );
  }
}
