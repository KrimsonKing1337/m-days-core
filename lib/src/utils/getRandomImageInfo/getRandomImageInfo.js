"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomImageInfo = void 0;
var getRandomInt_js_1 = require("../getRandomInt.js");
var getRandomImageInfoByPrefix_js_1 = require("./getRandomImageInfoByPrefix.js");
var getRandomImageInfo = function (presetInfo, imgBgJson) {
    if (!presetInfo.staticTopics) {
        return (0, getRandomImageInfoByPrefix_js_1.getRandomImageInfoByPrefix)('dynamic', presetInfo, imgBgJson);
    }
    if (!presetInfo.dynamicTopics) {
        return (0, getRandomImageInfoByPrefix_js_1.getRandomImageInfoByPrefix)('static', presetInfo, imgBgJson);
    }
    var randomStaticImage = (0, getRandomImageInfoByPrefix_js_1.getRandomImageInfoByPrefix)('static', presetInfo, imgBgJson);
    var randomDynamicImage = (0, getRandomImageInfoByPrefix_js_1.getRandomImageInfoByPrefix)('dynamic', presetInfo, imgBgJson);
    if (randomStaticImage && randomDynamicImage) {
        var rInt = (0, getRandomInt_js_1.getRandomInt)(0, 1);
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
exports.getRandomImageInfo = getRandomImageInfo;
//# sourceMappingURL=getRandomImageInfo.js.map