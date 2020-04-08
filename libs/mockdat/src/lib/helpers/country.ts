import { utils } from './utils';

export function country(options) {
  return utils.randomArrayItem(options.data.root.countries);
}
