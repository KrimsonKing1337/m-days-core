"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomImgPath = void 0;
var getRandomInt_1 = require("./getRandomInt");
function getRandomImgPath(imgs) {
    var random = (0, getRandomInt_1.getRandomInt)(0, imgs.length);
    return "img_bg/1920/".concat(imgs[random]);
}
exports.getRandomImgPath = getRandomImgPath;
//# sourceMappingURL=getRandomImgPath.js.map