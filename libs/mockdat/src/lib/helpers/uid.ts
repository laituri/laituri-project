import { utils } from './utils';

export function uid() {
  let ret = '';
  const mask = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

  for (let i = 0; i < 36; i++) {
    const c = mask[i - 1];
    // tslint:disable-next-line: no-bitwise
    const r = (utils.random() * 16) | 0;
    // tslint:disable-next-line: no-bitwise
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    ret += c === '-' || c === '4' ? c : v.toString(16);
  }
  return ret;
}
