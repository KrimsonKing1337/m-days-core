"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomDynamicImage = void 0;
var lodash_1 = require("lodash");
var randomInt_1 = require("../randomInt");
var getFormats_1 = require("./getFormats");
var prefix = 'dynamic';
function getRandomDynamicImage(presetInfo, imgBgJson) {
    var dynamicTopics = presetInfo.dynamicTopics, orientation = presetInfo.orientation;
    var dynamicTopicsAsArr = dynamicTopics.split(', ');
    var formats = (0, getFormats_1.getFormats)(orientation);
    var randomDynamicTopicIndex = (0, randomInt_1.randomInt)(0, dynamicTopicsAsArr.length - 1);
    var randomFormatIndex = (0, randomInt_1.randomInt)(0, formats.length - 1);
    var randomDynamicTopic = dynamicTopicsAsArr[randomDynamicTopicIndex];
    var randomFormat = formats[randomFormatIndex];
    var dynamicImgPath = "".concat(prefix, "/").concat(randomDynamicTopic, "/").concat(randomFormat);
    var dynamicImgPathWithoutSlashes = dynamicImgPath.replace(/\//g, '.');
    var randomDynamicImagesInOneFormat = (0, lodash_1.get)(imgBgJson, dynamicImgPathWithoutSlashes) || {};
    var randomDynamicImagesInOneSizeKeys = Object.keys(randomDynamicImagesInOneFormat);
    var randomDynamicImagesInOneSizeIndex = (0, randomInt_1.randomInt)(0, randomDynamicImagesInOneSizeKeys.length - 1);
    var randomDynamicImagesSize = randomDynamicImagesInOneSizeKeys[randomDynamicImagesInOneSizeIndex];
    dynamicImgPath = "".concat(prefix, "/").concat(randomDynamicTopic, "/").concat(randomFormat, "/").concat(randomDynamicImagesSize);
    dynamicImgPathWithoutSlashes = dynamicImgPath.replace(/\//g, '.');
    var randomDynamicImagesInOneSize = (0, lodash_1.get)(imgBgJson, dynamicImgPathWithoutSlashes) || {};
    var randomDynamicImagesValues = Object.values(randomDynamicImagesInOneSize);
    var randomDynamicImagesValuesIndex = (0, randomInt_1.randomInt)(0, randomDynamicImagesValues.length - 1);
    return randomDynamicImagesValues[randomDynamicImagesValuesIndex];
}
exports.getRandomDynamicImage = getRandomDynamicImage;
//# sourceMappingURL=getRandomDynamicImage.js.map