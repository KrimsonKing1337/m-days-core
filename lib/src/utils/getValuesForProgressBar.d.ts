import moment from 'moment';
export declare const getValuesForProgressBar: () => {
    date: moment.Moment;
    day: number;
    nameOfDay: string;
    month: number;
    year: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
    daysInYear: number;
    dayOfYear: number;
    nameOfMonth: string;
    progress: number;
    progressFull: string;
    progressShort: string;
};
