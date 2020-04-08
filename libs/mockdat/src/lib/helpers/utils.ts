import * as seedrandom from 'seedrandom';

let prng = seedrandom();

export const utils = {
  setRandomSeed: (seed: number) => {
    prng = seedrandom(seed);
  },

  random: () => {
    return prng();
  },

  randomInt: (min: number, max: number) => {
    return Math.floor(utils.random() * (max - min + 1)) + min;
  },

  randomFloat: (min: number, max: number) => {
    return utils.random() * (max - min) + min;
  },

  randomBoolean: () => {
    return utils.random() < 0.5;
  },

  randomDate: (min: number, max: number) => {
    // We add the timezone offset to avoid the date falling outside the supplied range
    const d = new Date(Math.floor(utils.random() * (max - min)) + min);
    d.setTime(d.getTime() + d.getTimezoneOffset() * 60000);
    return d;
  },

  randomArrayItem: (array: any[]) => {
    return array[utils.randomInt(0, array.length - 1)];
  },

  randomChar: (charset: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') => {
    return charset.charAt(utils.randomInt(0, charset.length - 1));
  },
};
