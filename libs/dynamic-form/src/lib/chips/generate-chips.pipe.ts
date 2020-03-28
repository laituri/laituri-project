import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generateChips',
})
export class GenerateChipsPipe implements PipeTransform {
  transform(values: string[]): ChipItem[] {
    console.log('asdasdad');
    if (!values) {
      return null;
    }
    return values.map((item, i) => {
      const chip: ChipItem = { key: i, title: item };
      return chip;
    });
  }
}
