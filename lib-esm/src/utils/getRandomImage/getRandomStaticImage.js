import { get } from 'lodash';
import { randomInt } from 'utils/randomInt';
import { getWidths } from './getWidths';
import { getFormats } from './getFormats';
var prefix = 'static';
export function getRandomStaticImage(presetInfo, imgBgJson) {
    var staticTopics = presetInfo.staticTopics, resolution = presetInfo.resolution, orientation = presetInfo.orientation;
    var widthAsArr = getWidths(resolution);
    var staticTopicsAsArr = staticTopics.split(', ');
    var formats = getFormats(orientation);
    var randomStaticTopicIndex = randomInt(0, staticTopicsAsArr.length - 1);
    var randomFormatIndex = randomInt(0, formats.length - 1);
    var randomWidthIndex = randomInt(0, widthAsArr.length - 1);
    var randomStaticTopic = staticTopicsAsArr[randomStaticTopicIndex];
    var randomWidth = widthAsArr[randomWidthIndex];
    var randomFormat = formats[randomFormatIndex];
    var staticImgPath = "".concat(prefix, "/").concat(randomStaticTopic, "/").concat(randomFormat, "/").concat(randomWidth);
    var staticImgPathWithoutSlashes = staticImgPath.replace(/\//g, '.');
    var randomStaticImagesInOneWidth = get(imgBgJson, staticImgPathWithoutSlashes);
    if (!randomStaticImagesInOneWidth) {
        var availableFormatsPath = "".concat(prefix, "/").concat(randomStaticTopic).replace(/\//g, '.');
        var availableFormatsObj = get(imgBgJson, availableFormatsPath);
        var availableFormats = Object.keys(availableFormatsObj);
        var randomAvailableFormatIndex = randomInt(0, availableFormats.length - 1);
        var randomAvailableFormat = availableFormats[randomAvailableFormatIndex];
        staticImgPath = "".concat(prefix, "/").concat(randomStaticTopic, "/").concat(randomAvailableFormat);
        staticImgPathWithoutSlashes = staticImgPath.replace(/\//g, '.');
        randomStaticImagesInOneWidth = get(imgBgJson, staticImgPathWithoutSlashes);
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
        randomStaticImagesInOneWidth = get(imgBgJson, staticImgPathWithoutSlashes);
    }
    var randomStaticImagesValues = Object.values(randomStaticImagesInOneWidth);
    var randomStaticImagesValuesIndex = randomInt(0, randomStaticImagesValues.length - 1);
    return randomStaticImagesValues[randomStaticImagesValuesIndex];
}
//# sourceMappingURL=getRandomStaticImage.js.map