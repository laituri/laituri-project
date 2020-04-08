import { utils } from './utils';

export function company(options: any) {
  const cache = options.data.root.__cache;
  if (cache.company) {
    return cache.company;
  }
  const _company =
    cache.company || utils.randomArrayItem(options.data.root.companies);
  cache.company = _company;
  cache.domain_company = _company;
  cache.email_company = _company;
  return _company;
}
