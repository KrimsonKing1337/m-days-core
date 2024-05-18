import { getRandomInt } from './getRandomInt';
export function getRandomImgPath(imgs) {
    var random = getRandomInt(0, imgs.length);
    return "img_bg/1920/".concat(imgs[random]);
}
//# sourceMappingURL=getRandomImgPath.js.map