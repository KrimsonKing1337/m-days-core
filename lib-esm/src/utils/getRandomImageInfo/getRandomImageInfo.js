import { getRandomInt } from '../getRandomInt.js';
import { getRandomImageInfoByPrefix } from './getRandomImageInfoByPrefix.js';
export var getRandomImageInfo = function (presetInfo, imgBgJson) {
    if (!presetInfo.staticTopics) {
        return getRandomImageInfoByPrefix('dynamic', presetInfo, imgBgJson);
    }
    if (!presetInfo.dynamicTopics) {
        return getRandomImageInfoByPrefix('static', presetInfo, imgBgJson);
    }
    var randomStaticImage = getRandomImageInfoByPrefix('static', presetInfo, imgBgJson);
    var randomDynamicImage = getRandomImageInfoByPrefix('dynamic', presetInfo, imgBgJson);
    if (randomStaticImage && randomDynamicImage) {
        var rInt = getRandomInt(0, 1);
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
//# sourceMappingURL=getRandomImageInfo.js.map