import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinClassNames',
})
export class JoinClassNamesPipe implements PipeTransform {
  transform(obj: { classNames: string[] }): string {
    if (!obj || !obj.classNames) {
      return '';
    }
    if (Array.isArray(obj.classNames)) {
      return obj.classNames.join(' ');
    }
    return '';
  }
}
