import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormStateService } from '../../core/form-state.service';
import { RepeaterField } from './repeater.types';

@Pipe({
  name: 'repeaterDisplayField',
})
export class RepeaterDisplayFieldPipe implements PipeTransform {
  constructor(private formState: FormStateService) {}

  async transform(
    controlValue: unknown,
    field: RepeaterField,
  ): Promise<string> {
    const { display } = field;
    if (!display) {
      return '';
    }
    const value = controlValue[display];
    if (!value) {
      return '';
    }
    if (typeof value === 'object') {
      const defaultLocale = await this.formState.getDefaultLocale();
      if (defaultLocale) {
        if (value[defaultLocale.key]) {
          try {
            return value[defaultLocale.key].toString();
          } catch (error) {
            //
          }
        }
      }
      return '';
    }

    return value.toString();
  }
}
