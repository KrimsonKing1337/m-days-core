"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormats = void 0;
var getFormats = function (orientation) {
    if (orientation === 'v') {
        return ['h', 'v', 'sq'];
    }
    if (orientation === 'h') {
        return ['h', 'sq'];
    }
    return ['h', 'v', 'sq'];
};
exports.getFormats = getFormats;
//# sourceMappingURL=getFormats.js.map