import { get } from 'lodash';

import { randomInt } from '../randomInt.js';
import type { Preset } from 'src/@types.js';

import { allWidths, getWidths } from './getWidths.js';
import { getFormats } from './getFormats.js';

export function getRandomImageByPrefix(prefix: string, presetInfo: Preset, imgBgJson: string) {
  const { staticTopics, dynamicTopics, resolution, orientation } = presetInfo;

  const topics = prefix === 'static' ? staticTopics : dynamicTopics;

  const widthAsArr = getWidths(resolution);
  const topicsAsArr = topics.split(', ');
  const formats = getFormats(orientation as string);

  const randomTopicIndex = randomInt(0, topicsAsArr.length - 1);

  const randomTopic = topicsAsArr[randomTopicIndex];

  const availableFormatsPath = `${prefix}/${randomTopic}`.replace(/\//g, '.');
  const availableFormatsObj = get(imgBgJson, availableFormatsPath);

  const formatsFromJson = Object.keys(availableFormatsObj) as any;
  const availableFormats: string[] = [];

  formats.forEach((formatCur) => {
    const isExist = formatsFromJson.some((cur: string) => cur === formatCur);

    if (isExist) {
      availableFormats.push(formatCur);
    }
  });

  const availableFormatsWidths: any = {};

  for (let i = 0; i < availableFormats.length; i++) {
    const formatCur = availableFormats[i];

    const formatPath = `${prefix}/${randomTopic}/${formatCur}`;
    const formatPathWithoutSlashes = formatPath.replace(/\//g, '.');

    const obj = get(imgBgJson, formatPathWithoutSlashes);

    availableFormatsWidths[formatCur] = Object.keys(obj);
  }

  const availableFormatsWidthsKeys1 = Object.keys(availableFormatsWidths);

  for (let i = 0; i < availableFormatsWidthsKeys1.length; i++) {
    const key = availableFormatsWidthsKeys1[i];
    const values = availableFormatsWidths[key];

    let newValue = values[values.length - 1];

    // фильтруем массив с разрешением из пресета массивом из доступных разрешений из json
    const widthsFiltered = widthAsArr.filter((widthCur) => values.includes(widthCur)).sort();

    // берём последнее значение из доступных
    newValue = widthsFiltered[widthsFiltered.length - 1];

    // если массив значений пуст, а значит и нет значения - то ищем ближайшее к нему. в приоритете следующее по списку
    if (!newValue) {
      const indexOfNativeWidth = allWidths.indexOf(widthAsArr[0]);

      for (let i = 0; i < values.length; i++) {
        const nextIndexFromNativeWidth = indexOfNativeWidth + 1;
        const prevIndexFromNativeWidth = indexOfNativeWidth - 1;

        const nextValueFromNativeWidth = allWidths[nextIndexFromNativeWidth];
        const prevValueFromNativeWidth = allWidths[prevIndexFromNativeWidth];

        if (nextValueFromNativeWidth && values.includes(nextValueFromNativeWidth)) {
          newValue = nextValueFromNativeWidth;

          break;
        }

        if (prevValueFromNativeWidth && values.includes(prevValueFromNativeWidth)) {
          newValue = prevValueFromNativeWidth;

          break;
        }
      }
    }

    availableFormatsWidths[key] = newValue;
  }

  const availableFormatsWidthsKeys2 = Object.keys(availableFormatsWidths);
  const availableFormatsWidthsValues = Object.values(availableFormatsWidths);

  const availableFormatsRandomIndex = randomInt(0, availableFormatsWidthsKeys2.length - 1);

  const randomFormat = availableFormatsWidthsKeys2[availableFormatsRandomIndex];
  const randomWidth = availableFormatsWidthsValues[availableFormatsRandomIndex];

  const fullPath = `${prefix}/${randomTopic}/${randomFormat}/${randomWidth}`;

  const fullPathWithoutSlashes = fullPath.replace(/\//g, '.');

  const imagesInOneWidthObj = get(imgBgJson, fullPathWithoutSlashes);
  const imagesInOneWidthObjRandomIndex = randomInt(0, Object.keys(imagesInOneWidthObj).length - 1);

  const randomImage = Object.values(imagesInOneWidthObj)[imagesInOneWidthObjRandomIndex];

  return randomImage;
}
