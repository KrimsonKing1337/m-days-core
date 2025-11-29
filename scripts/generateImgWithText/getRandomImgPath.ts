import { randomInt } from './randomInt.js';

export function getRandomImgPath(imgs: string[]) {
  const random = randomInt(0, imgs.length);

  return `img_bg/1920/${imgs[random]}`;
}
