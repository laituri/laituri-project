import { formatDate } from '@angular/common';
import { utils } from './utils';

export function date(
  minDate: string,
  maxDate: string,
  format?: string | 'time',
) {
  if (!minDate || !maxDate) {
    throw new Error('The time helper requires min and max values!');
  }
  console.log({ minDate, maxDate });

  const randomDate = getDate(minDate, maxDate, format);

  const { locale } = Intl.DateTimeFormat().resolvedOptions();

  if (format === 'unix') {
    return Math.floor(
      (randomDate.getTime() - randomDate.getTimezoneOffset() * 60000) / 1000,
    );
  } else if (format === 'time') {
    return formatDate(randomDate, 'HH:mm', locale);
  } else if (format) {
    return formatDate(randomDate, format, locale);
  }

  return randomDate;
}

function getDate(
  minDate: string,
  maxDate: string,
  format?: string | 'time',
): Date {
  const dateValues: { min: number; max: number } = { min: 0, max: 0 };
  if (format === 'time') {
    dateValues.min = Date.parse('1970-01-01T' + minDate);
    dateValues.max = Date.parse('1970-01-01T' + maxDate);
  } else {
    dateValues.min = Date.parse(minDate);
    dateValues.max = Date.parse(maxDate);
  }
  console.log(dateValues);

  return utils.randomDate(dateValues.min, dateValues.max);
}
