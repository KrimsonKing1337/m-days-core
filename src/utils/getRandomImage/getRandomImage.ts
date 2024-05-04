import { randomInt } from 'utils/randomInt';

import type { Preset } from 'src/@types.js';

import { getRandomStaticImage } from './getRandomStaticImage.js';
import { getRandomDynamicImage } from './getRandomDynamicImage.js';

export const getRandomImage = (presetInfo: Preset, imgBgJson: string) => {
  if (!presetInfo.staticTopics) {
    return getRandomDynamicImage(presetInfo, imgBgJson);
  }

  if (!presetInfo.dynamicTopics) {
    return getRandomStaticImage(presetInfo, imgBgJson);
  }

  const randomStaticImage = getRandomStaticImage(presetInfo, imgBgJson);
  const randomDynamicImage = getRandomDynamicImage(presetInfo, imgBgJson);

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
