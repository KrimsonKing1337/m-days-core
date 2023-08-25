export type GetCurrentPositionParams = {
    successCb: (pos: GeolocationPosition) => void;
    errorCb: (pos: GeolocationPositionError) => void;
};
export declare const getCurrentPosition: ({ successCb, errorCb }: GetCurrentPositionParams) => void;
