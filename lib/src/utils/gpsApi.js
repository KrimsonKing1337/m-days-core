"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentPosition = void 0;
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};
var getCurrentPosition = function (_a) {
    var successCb = _a.successCb, errorCb = _a.errorCb;
    navigator.geolocation.getCurrentPosition(successCb, errorCb, options);
};
exports.getCurrentPosition = getCurrentPosition;
//# sourceMappingURL=gpsApi.js.map