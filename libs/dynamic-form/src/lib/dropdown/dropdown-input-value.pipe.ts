import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dropdownInputValue',
})
export class DropdownInputValuePipe implements PipeTransform {
  transform(selected: FieldOption[]): string {
    if (!selected) {
      return '';
    }
    const values: string[] = selected.map(option => option.title);
    if (values.length < 4) {
      return values.join(', ');
    }
    return `${values.length} selected`;
  }
}
