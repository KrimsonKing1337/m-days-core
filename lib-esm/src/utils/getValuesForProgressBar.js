import moment from 'moment';
moment.locale('en');
export var getValuesForProgressBar = function () {
    var date = moment();
    var day = parseInt(date.format('DD'), 10);
    var nameOfDay = date.format('ddd');
    var month = parseInt(date.format('MM'), 10);
    var nameOfMonth = date.format('MMMM');
    var year = parseInt(date.format('YYYY'), 10);
    var hours = parseInt(date.format('HH'), 10);
    var minutes = parseInt(date.format('mm'), 10);
    var seconds = parseInt(date.format('ss'), 10);
    var milliseconds = parseInt(date.format('SSS'), 10);
    var yearStart = moment([year, 0, 1]);
    var daysInYear = moment([year, 11, 31]).diff(yearStart, 'days') + 1;
    var dayOfYear = date.dayOfYear();
    var dayInMilliseconds = 24 * 60 * 60 * 1000;
    var millisecondsNow = dayOfYear * dayInMilliseconds
        + hours * 60 * 60 * 1000
        + minutes * 60 * 1000
        + seconds * 1000
        + milliseconds
        - dayInMilliseconds;
    var millisecondsFull = daysInYear * dayInMilliseconds; // 31 536 000 000
    var progress = millisecondsNow / millisecondsFull * 100;
    var progressFull = progress.toFixed(7);
    var progressShort = progressFull.toString().slice(0, (progressFull.indexOf('.') + 3));
    return {
        date: date,
        day: day,
        nameOfDay: nameOfDay,
        month: month,
        year: year,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        milliseconds: milliseconds,
        daysInYear: daysInYear,
        dayOfYear: dayOfYear,
        nameOfMonth: nameOfMonth,
        progress: progress,
        progressFull: progressFull,
        progressShort: progressShort,
    };
};
//# sourceMappingURL=getValuesForProgressBar.js.map