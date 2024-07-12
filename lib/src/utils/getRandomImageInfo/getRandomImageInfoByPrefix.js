"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomImageInfoByPrefix = void 0;
var lodash_1 = require("lodash");
var getRandomInt_js_1 = require("../getRandomInt.js");
var getWidths_js_1 = require("./getWidths.js");
var getFormats_js_1 = require("./getFormats.js");
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
function getRandomImageInfoByPrefix(prefix, presetInfo, imgBgJson) {
    if (!Object.values) {
        Object.values = function (o) { return Object.keys(o).map(function (k) { return o[k]; }); };
    }
    var staticTopics = presetInfo.staticTopics, dynamicTopics = presetInfo.dynamicTopics, resolution = presetInfo.resolution, orientation = presetInfo.orientation, fileSize = presetInfo.fileSize;
    var topics = prefix === 'static' ? staticTopics : dynamicTopics;
    var widthAsArr = (0, getWidths_js_1.getWidths)(resolution);
    var topicsAsArr = topics.split(', ');
    var formats = (0, getFormats_js_1.getFormats)(orientation);
    var randomTopicIndex = (0, getRandomInt_js_1.getRandomInt)(0, topicsAsArr.length - 1);
    var randomTopic = topicsAsArr[randomTopicIndex];
    console.log(1);
    var availableFormatsPath = "".concat(prefix, "/").concat(randomTopic).replace(/\//g, '.');
    var availableFormatsObj = (0, lodash_1.get)(imgBgJson, availableFormatsPath);
    var formatsFromJson = Object.keys(availableFormatsObj);
    var availableFormats = [];
    formats.forEach(function (formatCur) {
        var isExist = formatsFromJson.some(function (cur) { return cur === formatCur; });
        if (isExist) {
            availableFormats.push(formatCur);
        }
    });
    console.log(2);
    var availableFormatsWidths = {};
    for (var i = 0; i < availableFormats.length; i++) {
        var formatCur = availableFormats[i];
        var formatPath = "".concat(prefix, "/").concat(randomTopic, "/").concat(formatCur);
        var formatPathWithoutSlashes = formatPath.replace(/\//g, '.');
        var obj = (0, lodash_1.get)(imgBgJson, formatPathWithoutSlashes);
        availableFormatsWidths[formatCur] = Object.keys(obj);
    }
    console.log(3);
    var availableFormatsWidthsKeys1 = Object.keys(availableFormatsWidths);
    var availableFormatsWidths1 = {};
    var _loop_1 = function (i) {
        var key = availableFormatsWidthsKeys1[i];
        var values = availableFormatsWidths[key];
        // фильтруем массив с разрешением из пресета массивом из доступных разрешений из json, после чего сортируем
        var widthsFiltered = widthAsArr.filter(function (widthCur) { return values.indexOf(widthCur) !== 0; }).sort();
        // берём последнее значение из доступных (как самая большая ширина после требуемой)
        var newValue = widthsFiltered[widthsFiltered.length - 1];
        // если массив значений пуст, а значит и нет значения - то ищем ближайшее к нему.
        // в приоритете следующее по списку, далее ищем предыдущее по списку
        // здесь я не беру тупо последнюю ширину, т.к. она может быть 5к при исходной в 640, например
        if (!newValue) {
            var indexOfNativeWidth = getWidths_js_1.allWidths.indexOf(widthAsArr[0]);
            for (var i_1 = 0; i_1 < getWidths_js_1.allWidths.length; i_1++) {
                var nextIndexFromNativeWidth = indexOfNativeWidth + i_1;
                var prevIndexFromNativeWidth = indexOfNativeWidth - i_1;
                var nextValueFromNativeWidth = getWidths_js_1.allWidths[nextIndexFromNativeWidth];
                var prevValueFromNativeWidth = getWidths_js_1.allWidths[prevIndexFromNativeWidth];
                if (nextValueFromNativeWidth && values.indexOf(nextValueFromNativeWidth) !== 0) {
                    newValue = nextValueFromNativeWidth;
                    break;
                }
                if (prevValueFromNativeWidth && values.indexOf(prevValueFromNativeWidth) !== 0) {
                    newValue = prevValueFromNativeWidth;
                    break;
                }
            }
        }
        availableFormatsWidths1[key] = newValue;
    };
    for (var i = 0; i < availableFormatsWidthsKeys1.length; i++) {
        _loop_1(i);
    }
    console.log(4);
    var availableFormatsWidthsKeys2 = Object.keys(availableFormatsWidths1);
    var availableFormatsWidthsValues = Object.values(availableFormatsWidths1);
    var availableFormatsRandomIndex = (0, getRandomInt_js_1.getRandomInt)(0, availableFormatsWidthsKeys2.length - 1);
    var randomFormat = availableFormatsWidthsKeys2[availableFormatsRandomIndex];
    var randomWidth = availableFormatsWidthsValues[availableFormatsRandomIndex];
    console.log(5);
    var fullPath = "".concat(prefix, "/").concat(randomTopic, "/").concat(randomFormat, "/").concat(randomWidth);
    var fullPathWithoutSlashes = fullPath.replace(/\//g, '.');
    var imagesInOneWidthObj = (0, lodash_1.get)(imgBgJson, fullPathWithoutSlashes);
    var filteredImagesInOneWidth = Object.values(imagesInOneWidthObj);
    console.log(6);
    // todo: маловероятно, но может возникнуть ситуация, что массив будет пуст
    if (fileSize) {
        filteredImagesInOneWidth = filteredImagesInOneWidth.filter(function (imageCur) {
            return Number(imageCur.size) <= Number(fileSize);
        });
    }
    var imagesInOneWidthObjRandomIndex = (0, getRandomInt_js_1.getRandomInt)(0, filteredImagesInOneWidth.length - 1);
    console.log(7);
    return filteredImagesInOneWidth[imagesInOneWidthObjRandomIndex];
}
exports.getRandomImageInfoByPrefix = getRandomImageInfoByPrefix;
//# sourceMappingURL=getRandomImageInfoByPrefix.js.map