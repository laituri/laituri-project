import { Pipe, PipeTransform } from '@angular/core';
import { Field, FieldOption } from '../../dynamic-form.types';

@Pipe({
  name: 'isChecked',
})
export class IsCheckedPipe implements PipeTransform {
  transform(
    option: FieldOption,
    field: Field,
    values: string[] | { [key: string]: boolean },
  ): boolean {
    if (values) {
      if (field.output === 'boolean-map') {
        return values[option.key];
      }
      if (Array.isArray(values)) {
        return values.includes(option.key);
      }
    }
    return false;
  }
}
