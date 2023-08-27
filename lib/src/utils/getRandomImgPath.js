"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomImgPath = void 0;
var randomInt_1 = require("./randomInt");
function getRandomImgPath(imgs) {
    var random = (0, randomInt_1.randomInt)(0, imgs.length);
    return "img_bg/1920/".concat(imgs[random]);
}
exports.getRandomImgPath = getRandomImgPath;
//# sourceMappingURL=getRandomImgPath.js.map