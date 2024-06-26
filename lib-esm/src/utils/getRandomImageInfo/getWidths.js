export var allWidths = ['128', '240', '360', '480', '640', '1280', '1600', '1920', '2560', '3840', '5210', '7680'];
export function getWidths(resolution) {
    var resolutionAsArr = resolution.split('*');
    var width = resolutionAsArr[0];
    if (width === '7680') {
        return ['7680', '5210', '3840', '2560', '1920'];
    }
    if (width === '5210') {
        return ['5210', '3840', '2560', '1920'];
    }
    if (width === '3840') {
        return ['3840', '2560', '1920'];
    }
    if (width === '2560') {
        return ['2560', '1920'];
    }
    if (width === '1920') {
        return ['1920'];
    }
    if (width === '1600') {
        return ['1600', '1280'];
    }
    if (width === '1280') {
        return ['1600', '1280'];
    }
    if (width === '640') {
        return ['640', '480'];
    }
    if (width === '480') {
        return ['480', '360'];
    }
    if (width === '360') {
        return ['480', '360', '240'];
    }
    if (width === '240') {
        return ['360', '240'];
    }
    if (width === '128') {
        return ['128', '100'];
    }
    return ['1920'];
}
//# sourceMappingURL=getWidths.js.map