import { get } from 'lodash';

import { randomInt } from 'utils/randomInt';

import type { Preset } from 'src/@types';

import { getWidths } from './getWidths';
import { getFormats } from './getFormats';

const prefix = 'static';

export function getRandomStaticImage(presetInfo: Preset, imgBgJson: string) {
  const { staticTopics, resolution, orientation } = presetInfo;

  const widthAsArr = getWidths(resolution);
  const staticTopicsAsArr = staticTopics.split(', ');
  const formats = getFormats(orientation as string);

  const randomStaticTopicIndex = randomInt(0, staticTopicsAsArr.length - 1);
  const randomFormatIndex = randomInt(0, formats.length - 1);
  const randomWidthIndex = randomInt(0, widthAsArr.length - 1);
  const randomStaticTopic = staticTopicsAsArr[randomStaticTopicIndex];
  const randomWidth = widthAsArr[randomWidthIndex];
  const randomFormat = formats[randomFormatIndex];

  let staticImgPath = `${prefix}/${randomStaticTopic}/${randomFormat}/${randomWidth}`;

  let staticImgPathWithoutSlashes = staticImgPath.replace(/\//g, '.');

  let randomStaticImagesInOneWidth = get(imgBgJson, staticImgPathWithoutSlashes);

  if (!randomStaticImagesInOneWidth) {
    const availableFormatsPath = `${prefix}/${randomStaticTopic}`.replace(/\//g, '.');
    const availableFormatsObj = get(imgBgJson, availableFormatsPath);

    const availableFormats = Object.keys(availableFormatsObj);
    const randomAvailableFormatIndex = randomInt(0, availableFormats.length - 1);
    const randomAvailableFormat = availableFormats[randomAvailableFormatIndex];

    staticImgPath = `${prefix}/${randomStaticTopic}/${randomAvailableFormat}`;
    staticImgPathWithoutSlashes = staticImgPath.replace(/\//g, '.');

    randomStaticImagesInOneWidth = get(imgBgJson, staticImgPathWithoutSlashes);

    const randomStaticImagesInOneWidthKeys = Object.keys(randomStaticImagesInOneWidth);

    const randomStaticImagesInOneWidthKeysIndex = randomStaticImagesInOneWidthKeys.indexOf(randomWidth);

    let randomStaticImagesWidth = randomStaticImagesInOneWidthKeys[randomStaticImagesInOneWidthKeysIndex];

    // todo: сделать по убывающей. сейчас берётся последняя доступная ширина, которая может быть 4к, например.
    //  реализовать так: если 1920 и такой ширины нет, то спускаемся ниже, на 1600. если и этого нет - то ещё дальше.
    //  и лишь в самом конце берём последнее из массива
    if (!randomStaticImagesWidth) {
      randomStaticImagesWidth = randomStaticImagesInOneWidthKeys[randomStaticImagesInOneWidthKeys.length - 1];
    }

    staticImgPath = `${prefix}/${randomStaticTopic}/${randomAvailableFormat}/${randomStaticImagesWidth}`;
    staticImgPathWithoutSlashes = staticImgPath.replace(/\//g, '.');

    randomStaticImagesInOneWidth = get(imgBgJson, staticImgPathWithoutSlashes);
  }

  const randomStaticImagesValues = Object.values(randomStaticImagesInOneWidth);
  const randomStaticImagesValuesIndex = randomInt(0, randomStaticImagesValues.length - 1);

  return randomStaticImagesValues[randomStaticImagesValuesIndex];
}
