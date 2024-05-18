import { get } from 'lodash';
import { getRandomInt } from '../getRandomInt.js';
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
export function getRandomImageInfoByPrefix(prefix, presetInfo, imgBgJson) {
    var staticTopics = presetInfo.staticTopics, dynamicTopics = presetInfo.dynamicTopics, resolution = presetInfo.resolution, orientation = presetInfo.orientation;
    var topics = prefix === 'static' ? staticTopics : dynamicTopics;
    var widthAsArr = getWidths(resolution);
    var topicsAsArr = topics.split(', ');
    var formats = getFormats(orientation);
    var randomTopicIndex = getRandomInt(0, topicsAsArr.length - 1);
    var randomTopic = topicsAsArr[randomTopicIndex];
    var availableFormatsPath = "".concat(prefix, "/").concat(randomTopic).replace(/\//g, '.');
    var availableFormatsObj = get(imgBgJson, availableFormatsPath);
    var formatsFromJson = Object.keys(availableFormatsObj);
    var availableFormats = [];
    formats.forEach(function (formatCur) {
        var isExist = formatsFromJson.some(function (cur) { return cur === formatCur; });
        if (isExist) {
            availableFormats.push(formatCur);
        }
    });
    var availableFormatsWidths = {};
    for (var i = 0; i < availableFormats.length; i++) {
        var formatCur = availableFormats[i];
        var formatPath = "".concat(prefix, "/").concat(randomTopic, "/").concat(formatCur);
        var formatPathWithoutSlashes = formatPath.replace(/\//g, '.');
        var obj = get(imgBgJson, formatPathWithoutSlashes);
        availableFormatsWidths[formatCur] = Object.keys(obj);
    }
    var availableFormatsWidthsKeys1 = Object.keys(availableFormatsWidths);
    var _loop_1 = function (i) {
        var key = availableFormatsWidthsKeys1[i];
        var values = availableFormatsWidths[key];
        var newValue = values[values.length - 1];
        // фильтруем массив с разрешением из пресета массивом из доступных разрешений из json, после чего сортируем
        var widthsFiltered = widthAsArr.filter(function (widthCur) { return values.includes(widthCur); }).sort();
        // берём последнее значение из доступных
        // todo: почему здесь берём последнее, а не первое? проверить ещё раз как это работает
        newValue = widthsFiltered[widthsFiltered.length - 1];
        // если массив значений пуст, а значит и нет значения - то ищем ближайшее к нему. в приоритете следующее по списку
        if (!newValue) {
            var indexOfNativeWidth = allWidths.indexOf(widthAsArr[0]);
            for (var i_1 = 0; i_1 < values.length; i_1++) {
                var nextIndexFromNativeWidth = indexOfNativeWidth + 1;
                var prevIndexFromNativeWidth = indexOfNativeWidth - 1;
                var nextValueFromNativeWidth = allWidths[nextIndexFromNativeWidth];
                var prevValueFromNativeWidth = allWidths[prevIndexFromNativeWidth];
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
    };
    for (var i = 0; i < availableFormatsWidthsKeys1.length; i++) {
        _loop_1(i);
    }
    var availableFormatsWidthsKeys2 = Object.keys(availableFormatsWidths);
    var availableFormatsWidthsValues = Object.values(availableFormatsWidths);
    var availableFormatsRandomIndex = getRandomInt(0, availableFormatsWidthsKeys2.length - 1);
    var randomFormat = availableFormatsWidthsKeys2[availableFormatsRandomIndex];
    var randomWidth = availableFormatsWidthsValues[availableFormatsRandomIndex];
    var fullPath = "".concat(prefix, "/").concat(randomTopic, "/").concat(randomFormat, "/").concat(randomWidth);
    var fullPathWithoutSlashes = fullPath.replace(/\//g, '.');
    var imagesInOneWidthObj = get(imgBgJson, fullPathWithoutSlashes);
    var imagesInOneWidthObjRandomIndex = getRandomInt(0, Object.keys(imagesInOneWidthObj).length - 1);
    return Object.values(imagesInOneWidthObj)[imagesInOneWidthObjRandomIndex];
}
//# sourceMappingURL=getRandomImageInfoByPrefix.js.map