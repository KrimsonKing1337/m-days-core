import { get } from 'lodash';

import { getRandomInt } from '../getRandomInt.js';
import type { Preset } from 'src/@types.js';

import { allWidths, getWidths } from './getWidths.js';
import { getFormats } from './getFormats.js';

/*
  что здесь происходит.
  получаем ширины из разрешения (его получаем из инфо о пресете),
  получаем формат (горизонталь, вертикаль и квадрат), так же из инфо о пресете.
  получаем список топиков (темы для отображения), тоже из инфо о пресете.

  получаем рандомный топик.
  далее фильтруем форматы. берём только те, что есть и в инфо о пресете, и в json.
  то же самое делаем и с ширинами.
  если после фильтра значений не будет - то берём ближайшую из списка.
  в приоритете - более высокое разрешение. если его нет - то берём более низкое.
  далее получаем рандомный формат и рандомную ширину.
  формируем путь, убираем слэши на точки. чтобы lodash.get мог получить для нас значение из json.
  это же действие делаем и в других местах.
  получится массив из изображений.
  из них берём случайное и возвращаем его.
*/

export function getRandomImageInfoByPrefix(prefix: string, presetInfo: Preset, imgBgJson: string) {
  const { staticTopics, dynamicTopics, resolution, orientation } = presetInfo;

  const topics = prefix === 'static' ? staticTopics : dynamicTopics;

  const widthAsArr = getWidths(resolution);
  const topicsAsArr = topics.split(', ');
  const formats = getFormats(orientation as string);

  const randomTopicIndex = getRandomInt(0, topicsAsArr.length - 1);

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

    // фильтруем массив с разрешением из пресета массивом из доступных разрешений из json, после чего сортируем
    const widthsFiltered = widthAsArr.filter((widthCur) => values.includes(widthCur)).sort();

    // берём последнее значение из доступных
    // todo: почему здесь берём последнее, а не первое? проверить ещё раз как это работает
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

  const availableFormatsRandomIndex = getRandomInt(0, availableFormatsWidthsKeys2.length - 1);

  const randomFormat = availableFormatsWidthsKeys2[availableFormatsRandomIndex];
  const randomWidth = availableFormatsWidthsValues[availableFormatsRandomIndex];

  const fullPath = `${prefix}/${randomTopic}/${randomFormat}/${randomWidth}`;

  const fullPathWithoutSlashes = fullPath.replace(/\//g, '.');

  const imagesInOneWidthObj = get(imgBgJson, fullPathWithoutSlashes);
  const imagesInOneWidthObjRandomIndex = getRandomInt(0, Object.keys(imagesInOneWidthObj).length - 1);

  return Object.values(imagesInOneWidthObj)[imagesInOneWidthObjRandomIndex];
}
