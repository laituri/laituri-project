import { utils } from './utils';
import { firstName, lastName, company, tld } from '.';

export function email(options) {
  // Try to use the cached values first, otherwise generate a new value
  const cache = options.data.root.__cache;
  const _firstName = cache.email_firstName || firstName(options);
  const _lastName = cache.email_lastName || lastName(options);
  const _company = cache.email_company || company(options);
  const _tld = cache.email_tld || tld(options);

  return (
    _firstName.toLowerCase() +
    '.' +
    _lastName.toLowerCase() +
    '@' +
    _company.toLowerCase() +
    '.' +
    _tld
  );
}
