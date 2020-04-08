import { utils } from './utils';

export function tld(options) {
  const cache = options.data.root.__cache;
  if (cache.tld) {
    return cache.tld;
  }
  const _tld = utils.randomArrayItem(options.data.root.tlds);
  cache.tld = _tld;
  cache.domain_tld = _tld;
  cache.email_tld = _tld;
  return _tld;
}
