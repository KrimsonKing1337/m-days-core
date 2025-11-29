import { randomInt } from './randomInt.js';

/**
 *
 * @param imgs {string}
 * @returns {string}
 */
export function getRandomImgPath(imgs) {
  const random = randomInt(0, imgs.length);

  return `img_bg/1920/${imgs[random]}`;
}
