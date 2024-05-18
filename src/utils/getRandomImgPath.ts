import { getRandomInt } from './getRandomInt';

export function getRandomImgPath(imgs: string) {
  const random = getRandomInt(0, imgs.length);

  return `img_bg/1920/${imgs[random]}`;
}
