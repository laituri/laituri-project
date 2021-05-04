import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dropdownPreviewSize',
})
export class DropdownPreviewSizePipe implements PipeTransform {
  transform(files: File[]): string {
    if (files.length === 1) {
      const file = files[0];

      return formatBytes(file.size);
    }
    const totalBytes = files.reduce((acc, cur) => {
      return acc + cur.size;
    }, 0);
    return `Total of ${formatBytes(totalBytes)}`;
  }
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
