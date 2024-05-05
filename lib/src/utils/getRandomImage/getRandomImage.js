"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomImage = void 0;
var randomInt_1 = require("../randomInt");
var getRandomStaticImage_js_1 = require("./getRandomStaticImage.js");
var getRandomDynamicImage_js_1 = require("./getRandomDynamicImage.js");
var getRandomImage = function (presetInfo, imgBgJson) {
    if (!presetInfo.staticTopics) {
        return (0, getRandomDynamicImage_js_1.getRandomDynamicImage)(presetInfo, imgBgJson);
    }
    if (!presetInfo.dynamicTopics) {
        return (0, getRandomStaticImage_js_1.getRandomStaticImage)(presetInfo, imgBgJson);
    }
    var randomStaticImage = (0, getRandomStaticImage_js_1.getRandomStaticImage)(presetInfo, imgBgJson);
    var randomDynamicImage = (0, getRandomDynamicImage_js_1.getRandomDynamicImage)(presetInfo, imgBgJson);
    if (randomStaticImage && randomDynamicImage) {
        var rInt = (0, randomInt_1.randomInt)(0, 1);
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