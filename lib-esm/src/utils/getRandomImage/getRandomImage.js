import { randomInt } from '../randomInt.js';
import { getRandomImageByPrefix } from './getRandomImageByPrefix.js';
export var getRandomImage = function (presetInfo, imgBgJson) {
    if (!presetInfo.staticTopics) {
        return getRandomImageByPrefix('dynamic', presetInfo, imgBgJson);
    }
    if (!presetInfo.dynamicTopics) {
        return getRandomImageByPrefix('static', presetInfo, imgBgJson);
    }
    var randomStaticImage = getRandomImageByPrefix('static', presetInfo, imgBgJson);
    var randomDynamicImage = getRandomImageByPrefix('dynamic', presetInfo, imgBgJson);
    if (randomStaticImage && randomDynamicImage) {
        var rInt = randomInt(0, 1);
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
//# sourceMappingURL=getRandomImage.js.map