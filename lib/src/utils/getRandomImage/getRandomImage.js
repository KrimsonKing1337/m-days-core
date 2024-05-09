"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomImage = void 0;
var randomInt_js_1 = require("../randomInt.js");
var getRandomImageByPrefix_js_1 = require("./getRandomImageByPrefix.js");
var getRandomImage = function (presetInfo, imgBgJson) {
    if (!presetInfo.staticTopics) {
        return (0, getRandomImageByPrefix_js_1.getRandomImageByPrefix)('dynamic', presetInfo, imgBgJson);
    }
    if (!presetInfo.dynamicTopics) {
        return (0, getRandomImageByPrefix_js_1.getRandomImageByPrefix)('static', presetInfo, imgBgJson);
    }
    var randomStaticImage = (0, getRandomImageByPrefix_js_1.getRandomImageByPrefix)('static', presetInfo, imgBgJson);
    var randomDynamicImage = (0, getRandomImageByPrefix_js_1.getRandomImageByPrefix)('dynamic', presetInfo, imgBgJson);
    if (randomStaticImage && randomDynamicImage) {
        var rInt = (0, randomInt_js_1.randomInt)(0, 1);
        if (rInt === 0) {
            return randomDynamicImage;
        }
        return randomStaticImage;
    }
    if (randomDynamicImage && !randomStaticImage) {
        return randomDynamicImage;
    }
    return randomStaticImage;
};
exports.getRandomImage = getRandomImage;
//# sourceMappingURL=getRandomImage.js.map