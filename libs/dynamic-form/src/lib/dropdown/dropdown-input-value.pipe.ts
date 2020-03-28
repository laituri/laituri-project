import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dropdownInputValue',
})
export class DropdownInputValuePipe implements PipeTransform {
  transform(selected: FieldOption[], display: string): string {
    console.log(display);

    if (!selected || !selected.length) {
      return '';
    }
    const values: string[] = selected.map(option => option.title);
    if (values.length < 4 && display !== 'chips') {
      return values.join(', ');
    }
    return `${values.length} selected`;
  }
}
