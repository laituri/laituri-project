import { Pipe, PipeTransform } from '@angular/core';
import { FieldOption } from '../../dynamic-form.types';

@Pipe({
  name: 'dropdownOptionSelected',
})
export class DropdownOptionSelectedPipe implements PipeTransform {
  transform(option: FieldOption, selectedKeys: string[]): string {
    return selectedKeys.includes(option.key) ? 'selected' : 'unselected';
  }
}
