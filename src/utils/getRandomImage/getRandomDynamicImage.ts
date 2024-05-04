import { get } from 'lodash';

import { randomInt } from 'utils/randomInt';

import type { Preset } from 'src/@types';

import { getFormats } from './getFormats';

const prefix = 'dynamic';

export function getRandomDynamicImage(presetInfo: Preset, imgBgJson: string) {
  const { dynamicTopics, orientation } = presetInfo;

  const dynamicTopicsAsArr = dynamicTopics.split(', ');
  const formats = getFormats(orientation as string);

  const randomDynamicTopicIndex = randomInt(0, dynamicTopicsAsArr.length - 1);
  const randomFormatIndex = randomInt(0, formats.length - 1);

  const randomDynamicTopic = dynamicTopicsAsArr[randomDynamicTopicIndex];
  const randomFormat = formats[randomFormatIndex];

  let dynamicImgPath = `${prefix}/${randomDynamicTopic}/${randomFormat}`;
  let dynamicImgPathWithoutSlashes = dynamicImgPath.replace(/\//g, '.');

  const randomDynamicImagesInOneFormat = get(imgBgJson, dynamicImgPathWithoutSlashes) || {};

  const randomDynamicImagesInOneSizeKeys = Object.keys(randomDynamicImagesInOneFormat);
  const randomDynamicImagesInOneSizeIndex = randomInt(0, randomDynamicImagesInOneSizeKeys.length - 1);
  const randomDynamicImagesSize = randomDynamicImagesInOneSizeKeys[randomDynamicImagesInOneSizeIndex];

  dynamicImgPath = `${prefix}/${randomDynamicTopic}/${randomFormat}/${randomDynamicImagesSize}`;
  dynamicImgPathWithoutSlashes = dynamicImgPath.replace(/\//g, '.');

  const randomDynamicImagesInOneSize = get(imgBgJson, dynamicImgPathWithoutSlashes) || {};

  const randomDynamicImagesValues = Object.values(randomDynamicImagesInOneSize);
  const randomDynamicImagesValuesIndex = randomInt(0, randomDynamicImagesValues.length - 1);

  return randomDynamicImagesValues[randomDynamicImagesValuesIndex];
}
