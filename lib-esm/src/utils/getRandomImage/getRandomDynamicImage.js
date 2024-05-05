import { get } from 'lodash';
import { randomInt } from 'utils/randomInt';
import { getFormats } from './getFormats';
var prefix = 'dynamic';
export function getRandomDynamicImage(presetInfo, imgBgJson) {
    var dynamicTopics = presetInfo.dynamicTopics, orientation = presetInfo.orientation;
    var dynamicTopicsAsArr = dynamicTopics.split(', ');
    var formats = getFormats(orientation);
    var randomDynamicTopicIndex = randomInt(0, dynamicTopicsAsArr.length - 1);
    var randomFormatIndex = randomInt(0, formats.length - 1);
    var randomDynamicTopic = dynamicTopicsAsArr[randomDynamicTopicIndex];
    var randomFormat = formats[randomFormatIndex];
    var dynamicImgPath = "".concat(prefix, "/").concat(randomDynamicTopic, "/").concat(randomFormat);
    var dynamicImgPathWithoutSlashes = dynamicImgPath.replace(/\//g, '.');
    var randomDynamicImagesInOneFormat = get(imgBgJson, dynamicImgPathWithoutSlashes) || {};
    var randomDynamicImagesInOneSizeKeys = Object.keys(randomDynamicImagesInOneFormat);
    var randomDynamicImagesInOneSizeIndex = randomInt(0, randomDynamicImagesInOneSizeKeys.length - 1);
    var randomDynamicImagesSize = randomDynamicImagesInOneSizeKeys[randomDynamicImagesInOneSizeIndex];
    dynamicImgPath = "".concat(prefix, "/").concat(randomDynamicTopic, "/").concat(randomFormat, "/").concat(randomDynamicImagesSize);
    dynamicImgPathWithoutSlashes = dynamicImgPath.replace(/\//g, '.');
    var randomDynamicImagesInOneSize = get(imgBgJson, dynamicImgPathWithoutSlashes) || {};
    var randomDynamicImagesValues = Object.values(randomDynamicImagesInOneSize);
    var randomDynamicImagesValuesIndex = randomInt(0, randomDynamicImagesValues.length - 1);
    return randomDynamicImagesValues[randomDynamicImagesValuesIndex];
}
//# sourceMappingURL=getRandomDynamicImage.js.map