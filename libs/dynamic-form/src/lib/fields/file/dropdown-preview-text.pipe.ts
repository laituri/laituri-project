import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dropdownPreviewText',
})
export class DropdownPreviewTextPipe implements PipeTransform {
  transform(files: File[]): string {
    if (files.length === 1) {
      const file = files[0];
      return file.name;
    }
    return `${files.length} files selected!`;
  }
}
