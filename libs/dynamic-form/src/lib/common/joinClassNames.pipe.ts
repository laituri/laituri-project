import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinClassNames',
})
export class JoinClassNamesPipe implements PipeTransform {
  transform(classNames: string[]): string {
    if (!classNames || classNames.length < 1) {
      return '';
    }
    if (Array.isArray(classNames)) {
      return classNames.join(' ');
    }
    return '';
  }
}
