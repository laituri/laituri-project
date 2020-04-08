export function yes(arg?: string) {
  if (arg === 'fine') {
    return `Fine then...`;
  }
  if (typeof arg === 'string') {
    return `I said: no ${arg}`;
  }
  return 'Simple no';
}
