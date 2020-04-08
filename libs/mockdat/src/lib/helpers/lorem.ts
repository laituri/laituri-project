import { utils } from './utils';

export function lorem(totalWords, options) {
  let _lorem = '';
  let isNewSentence = true;
  let lastPunctuationIndex = 0;

  for (let i = 0; i < totalWords; i++) {
    let word = utils.randomArrayItem(options.data.root.lorems);

    // If the last iteration triggered a new sentence then capitalize the first letter
    if (isNewSentence) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
      isNewSentence = false;
    }

    // Only introduce new punctuation if we're more then 3 words away from the end,
    // and more than 3 words since the last punctuation, and a 1 in 3 chance.
    if (
      i < totalWords - 3 &&
      i - lastPunctuationIndex > 3 &&
      utils.random() < 0.3
    ) {
      isNewSentence = utils.random() < 0.6;
      word = word + (isNewSentence ? '.' : ',');
      lastPunctuationIndex = i;
    }

    _lorem = _lorem + word + ' ';
  }

  // Add a period/full-stop at the very end
  _lorem = _lorem.trimRight() + '.';
  return _lorem;
}
