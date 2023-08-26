export var getSrcOfWeatherIcon = function (weathercode, is_day) {
    var isDay = !!is_day;
    var iconSrc = '999.svg';
    if (weathercode === 0) {
        isDay ? iconSrc = '100.svg' : iconSrc = '150.svg';
    }
    else if (weathercode === 1) {
        isDay ? iconSrc = '102.svg' : iconSrc = '152.svg';
    }
    else if (weathercode === 2) {
        isDay ? iconSrc = '101.svg' : iconSrc = '151.svg';
    }
    else if (weathercode === 3) {
        iconSrc = '104.svg';
    }
    else if (weathercode === 45) {
        iconSrc = '500.svg';
    }
    else if (weathercode === 48) {
        iconSrc = '501.svg';
    }
    else if (weathercode === 51) {
        iconSrc = '309.svg';
    }
    else if (weathercode === 53) {
        iconSrc = '311.svg';
    }
    else if (weathercode === 55) {
        iconSrc = '312.svg';
    }
    else if (weathercode === 56 || weathercode === 57) {
        iconSrc = '309.svg';
    }
    else if (weathercode === 61) {
        iconSrc = '305.svg';
    }
    else if (weathercode === 63) {
        iconSrc = '306.svg';
    }
    else if (weathercode === 65) {
        iconSrc = '307.svg';
    }
    else if (weathercode === 66 || weathercode === 67) {
        iconSrc = '405.svg';
    }
    else if (weathercode === 71) {
        iconSrc = '400.svg';
    }
    else if (weathercode === 73) {
        iconSrc = '401.svg';
    }
    else if (weathercode === 75) {
        iconSrc = '402.svg';
    }
    else if (weathercode === 77) {
        iconSrc = '400.svg';
    }
    else if (weathercode === 80) {
        isDay ? iconSrc = '300.svg' : iconSrc = '350.svg';
    }
    else if (weathercode === 81 || weathercode === 82) {
        isDay ? iconSrc = '301.svg' : iconSrc = '351.svg';
    }
    else if (weathercode === 85 || weathercode === 86) {
        isDay ? iconSrc = '407.svg' : iconSrc = '457.svg';
    }
    else if (weathercode === 95) {
        iconSrc = '302.svg';
    }
    else if (weathercode === 96 || weathercode === 99) {
        iconSrc = '304.svg';
    }
    return iconSrc;
};
//# sourceMappingURL=getSrcOfWeatherIcon.js.map