import { randomInt } from 'utils/randomInt';
import { getRandomStaticImage } from './getRandomStaticImage.js';
import { getRandomDynamicImage } from './getRandomDynamicImage.js';
export var getRandomImage = function (presetInfo, imgBgJson) {
    if (!presetInfo.staticTopics) {
        return getRandomDynamicImage(presetInfo, imgBgJson);
    }
    if (!presetInfo.dynamicTopics) {
        return getRandomStaticImage(presetInfo, imgBgJson);
    }
    var randomStaticImage = getRandomStaticImage(presetInfo, imgBgJson);
    var randomDynamicImage = getRandomDynamicImage(presetInfo, imgBgJson);
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