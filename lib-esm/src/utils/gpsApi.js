var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};
export var getCurrentPosition = function (_a) {
    var successCb = _a.successCb, errorCb = _a.errorCb;
    navigator.geolocation.getCurrentPosition(successCb, errorCb, options);
};
//# sourceMappingURL=gpsApi.js.map