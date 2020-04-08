import { utils } from './utils';

export function firstName(options: any) {
  const cache = options.data.root.__cache;
  if (cache.firstName) {
    return cache.firstName;
  }
  const _firstName =
    cache.firstName || utils.randomArrayItem(options.data.root.firstNames);
  cache.firstName = _firstName;
  cache.username_firstName = _firstName;
  cache.email_firstName = _firstName;
  return _firstName;
}

export function lastName(options: any) {
  const cache = options.data.root.__cache;
  if (cache.lastName) {
    return cache.lastName;
  }
  const _lastName =
    cache.lastName || utils.randomArrayItem(options.data.root.lastNames);
  cache.lastName = _lastName;
  cache.username_lastName = _lastName;
  cache.email_lastName = _lastName;
  return _lastName;
}

export function fullName(options: any) {
  const _firstName = firstName(options);
  const _lastName = lastName(options);
  return `${_firstName} ${_lastName}`;
}
