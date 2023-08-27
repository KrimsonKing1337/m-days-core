import { randomInt } from './randomInt';
export function getRandomImgPath(imgs) {
    var random = randomInt(0, imgs.length);
    return "img_bg/1920/".concat(imgs[random]);
}
//# sourceMappingURL=getRandomImgPath.js.map