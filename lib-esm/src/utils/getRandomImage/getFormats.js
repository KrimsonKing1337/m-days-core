export var getFormats = function (orientation) {
    if (orientation === 'v') {
        return ['h', 'v', 'sq'];
    }
    if (orientation === 'h') {
        return ['h', 'sq'];
    }
    return ['h', 'v', 'sq'];
};
//# sourceMappingURL=getFormats.js.map