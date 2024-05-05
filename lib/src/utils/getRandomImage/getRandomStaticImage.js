"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomStaticImage = void 0;
var lodash_1 = require("lodash");
var randomInt_1 = require("../randomInt");
var getWidths_1 = require("./getWidths");
var getFormats_1 = require("./getFormats");
var prefix = 'static';
function getRandomStaticImage(presetInfo, imgBgJson) {
    var staticTopics = presetInfo.staticTopics, resolution = presetInfo.resolution, orientation = presetInfo.orientation;
    var widthAsArr = (0, getWidths_1.getWidths)(resolution);
    var staticTopicsAsArr = staticTopics.split(', ');
    var formats = (0, getFormats_1.getFormats)(orientation);
    var randomStaticTopicIndex = (0, randomInt_1.randomInt)(0, staticTopicsAsArr.length - 1);
    var randomFormatIndex = (0, randomInt_1.randomInt)(0, formats.length - 1);
    var randomWidthIndex = (0, randomInt_1.randomInt)(0, widthAsArr.length - 1);
    var randomStaticTopic = staticTopicsAsArr[randomStaticTopicIndex];
    var randomWidth = widthAsArr[randomWidthIndex];
    var randomFormat = formats[randomFormatIndex];
    var staticImgPath = "".concat(prefix, "/").concat(randomStaticTopic, "/").concat(randomFormat, "/").concat(randomWidth);
    var staticImgPathWithoutSlashes = staticImgPath.replace(/\//g, '.');
    var randomStaticImagesInOneWidth = (0, lodash_1.get)(imgBgJson, staticImgPathWithoutSlashes);
    if (!randomStaticImagesInOneWidth) {
        var availableFormatsPath = "".concat(prefix, "/").concat(randomStaticTopic).replace(/\//g, '.');
        var availableFormatsObj = (0, lodash_1.get)(imgBgJson, availableFormatsPath);
        var availableFormats = Object.keys(availableFormatsObj);
        var randomAvailableFormatIndex = (0, randomInt_1.randomInt)(0, availableFormats.length - 1);
        var randomAvailableFormat = availableFormats[randomAvailableFormatIndex];
        staticImgPath = "".concat(prefix, "/").concat(randomStaticTopic, "/").concat(randomAvailableFormat);
        staticImgPathWithoutSlashes = staticImgPath.replace(/\//g, '.');
        randomStaticImagesInOneWidth = (0, lodash_1.get)(imgBgJson, staticImgPathWithoutSlashes);
        var randomStaticImagesInOneWidthKeys = Object.keys(randomStaticImagesInOneWidth);
        var randomStaticImagesInOneWidthKeysIndex = randomStaticImagesInOneWidthKeys.indexOf(randomWidth);
        var randomStaticImagesWidth = randomStaticImagesInOneWidthKeys[randomStaticImagesInOneWidthKeysIndex];
        // todo: сделать по убывающей. сейчас берётся последняя доступная ширина, которая может быть 4к, например.
        //  реализовать так: если 1920 и такой ширины нет, то спускаемся ниже, на 1600. если и этого нет - то ещё дальше.
        //  и лишь в самом конце берём последнее из массива
        if (!randomStaticImagesWidth) {
            randomStaticImagesWidth = randomStaticImagesInOneWidthKeys[randomStaticImagesInOneWidthKeys.length - 1];
        }
        staticImgPath = "".concat(prefix, "/").concat(randomStaticTopic, "/").concat(randomAvailableFormat, "/").concat(randomStaticImagesWidth);
        staticImgPathWithoutSlashes = staticImgPath.replace(/\//g, '.');
        randomStaticImagesInOneWidth = (0, lodash_1.get)(imgBgJson, staticImgPathWithoutSlashes);
    }
    var randomStaticImagesValues = Object.values(randomStaticImagesInOneWidth);
    var randomStaticImagesValuesIndex = (0, randomInt_1.randomInt)(0, randomStaticImagesValues.length - 1);
    return randomStaticImagesValues[randomStaticImagesValuesIndex];
}
exports.getRandomStaticImage = getRandomStaticImage;
//# sourceMappingURL=getRandomStaticImage.js.map