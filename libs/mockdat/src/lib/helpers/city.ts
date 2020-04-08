import { utils } from './utils';

export function city(options) {
  return utils.randomArrayItem(options.data.root.cities);
}
