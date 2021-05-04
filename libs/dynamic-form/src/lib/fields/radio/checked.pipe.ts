import { Pipe, PipeTransform } from '@angular/core';
import { FieldOption } from '../../dynamic-form.types';

@Pipe({
  name: 'isChecked',
})
export class IsCheckedPipe implements PipeTransform {
  transform(option: FieldOption, value: string): boolean {
    const checked = value === option.key;
    return checked;
  }
}
