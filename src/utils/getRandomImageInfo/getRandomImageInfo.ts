import { getRandomInt } from '../getRandomInt.js';
import type { Preset } from 'src/@types.js';

import { getRandomImageInfoByPrefix } from './getRandomImageInfoByPrefix.js';

export const getRandomImageInfo = (presetInfo: Preset, imgBgJson: string) => {
  if (!presetInfo.staticTopics) {
    return getRandomImageInfoByPrefix('dynamic', presetInfo, imgBgJson);
  }

  if (!presetInfo.dynamicTopics) {
    return getRandomImageInfoByPrefix('static', presetInfo, imgBgJson);
  }

  const randomStaticImage = getRandomImageInfoByPrefix('static', presetInfo, imgBgJson);
  const randomDynamicImage = getRandomImageInfoByPrefix('dynamic', presetInfo, imgBgJson);

  if (randomStaticImage && randomDynamicImage) {
    const rInt = getRandomInt(0, 1);

    if (rInt === 0) {
      return randomDynamicImage;
    }

    return randomStaticImage;
  }

  if (randomDynamicImage && !randomStaticImage) {
    return randomDynamicImage;
  }

  return randomStaticImage;
};
