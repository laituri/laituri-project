import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dropdownOptionSelected',
})
export class DropdownOptionSelectedPipe implements PipeTransform {
  transform(option: FieldOption, selectedKeys: string[]): string {
    return selectedKeys.includes(option.key) ? 'selected' : 'unselected';
  }
}
