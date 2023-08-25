export const twoDigitsAlways = (digit: number) => {
  return digit < 10 ? `0${digit}` : digit;
};
