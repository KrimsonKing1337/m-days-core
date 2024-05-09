import { randomInt } from '../randomInt.js';
import type { Preset } from 'src/@types.js';

import { getRandomImageByPrefix } from './getRandomImageByPrefix.js';

export const getRandomImage = (presetInfo: Preset, imgBgJson: string) => {
  if (!presetInfo.staticTopics) {
    return getRandomImageByPrefix('dynamic', presetInfo, imgBgJson);
  }

  if (!presetInfo.dynamicTopics) {
    return getRandomImageByPrefix('static', presetInfo, imgBgJson);
  }

  const randomStaticImage = getRandomImageByPrefix('static', presetInfo, imgBgJson);
  const randomDynamicImage = getRandomImageByPrefix('dynamic', presetInfo, imgBgJson);

  if (randomStaticImage && randomDynamicImage) {
    const rInt = randomInt(0, 1);

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
