"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomImageByPrefix = void 0;
var lodash_1 = require("lodash");
var randomInt_js_1 = require("../randomInt.js");
var getWidths_js_1 = require("./getWidths.js");
var getFormats_js_1 = require("./getFormats.js");
function getRandomImageByPrefix(prefix, presetInfo, imgBgJson) {
    var staticTopics = presetInfo.staticTopics, dynamicTopics = presetInfo.dynamicTopics, resolution = presetInfo.resolution, orientation = presetInfo.orientation;
    var topics = prefix === 'static' ? staticTopics : dynamicTopics;
    var widthAsArr = (0, getWidths_js_1.getWidths)(resolution);
    var topicsAsArr = topics.split(', ');
    var formats = (0, getFormats_js_1.getFormats)(orientation);
    var randomTopicIndex = (0, randomInt_js_1.randomInt)(0, topicsAsArr.length - 1);
    var randomTopic = topicsAsArr[randomTopicIndex];
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
    var availableFormatsWidths = {};
    for (var i = 0; i < availableFormats.length; i++) {
        var formatCur = availableFormats[i];
        var formatPath = "".concat(prefix, "/").concat(randomTopic, "/").concat(formatCur);
        var formatPathWithoutSlashes = formatPath.replace(/\//g, '.');
        var obj = (0, lodash_1.get)(imgBgJson, formatPathWithoutSlashes);
        availableFormatsWidths[formatCur] = Object.keys(obj);
    }
    var availableFormatsWidthsKeys1 = Object.keys(availableFormatsWidths);
    var _loop_1 = function (i) {
        var key = availableFormatsWidthsKeys1[i];
        var values = availableFormatsWidths[key];
        var newValue = values[values.length - 1];
        // фильтруем массив с разрешением из пресета массивом из доступных разрешений из json
        var widthsFiltered = widthAsArr.filter(function (widthCur) { return values.includes(widthCur); }).sort();
        // берём последнее значение из доступных
        newValue = widthsFiltered[widthsFiltered.length - 1];
        // если массив значений пуст, а значит и нет значения - то ищем ближайшее к нему. в приоритете следующее по списку
        if (!newValue) {
            var indexOfNativeWidth = getWidths_js_1.allWidths.indexOf(widthAsArr[0]);
            for (var i_1 = 0; i_1 < values.length; i_1++) {
                var nextIndexFromNativeWidth = indexOfNativeWidth + 1;
                var prevIndexFromNativeWidth = indexOfNativeWidth - 1;
                var nextValueFromNativeWidth = getWidths_js_1.allWidths[nextIndexFromNativeWidth];
                var prevValueFromNativeWidth = getWidths_js_1.allWidths[prevIndexFromNativeWidth];
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
    var availableFormatsRandomIndex = (0, randomInt_js_1.randomInt)(0, availableFormatsWidthsKeys2.length - 1);
    var randomFormat = availableFormatsWidthsKeys2[availableFormatsRandomIndex];
    var randomWidth = availableFormatsWidthsValues[availableFormatsRandomIndex];
    var fullPath = "".concat(prefix, "/").concat(randomTopic, "/").concat(randomFormat, "/").concat(randomWidth);
    var fullPathWithoutSlashes = fullPath.replace(/\//g, '.');
    var imagesInOneWidthObj = (0, lodash_1.get)(imgBgJson, fullPathWithoutSlashes);
    var imagesInOneWidthObjRandomIndex = (0, randomInt_js_1.randomInt)(0, Object.keys(imagesInOneWidthObj).length - 1);
    var randomImage = Object.values(imagesInOneWidthObj)[imagesInOneWidthObjRandomIndex];
    return randomImage;
}
exports.getRandomImageByPrefix = getRandomImageByPrefix;
//# sourceMappingURL=getRandomImageByPrefix.js.map