const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export type GetCurrentPositionParams = {
  successCb: (pos: GeolocationPosition) => void;
  errorCb: (pos: GeolocationPositionError) => void;
};

export const getCurrentPosition = ({ successCb, errorCb }: GetCurrentPositionParams) => {
  navigator.geolocation.getCurrentPosition(successCb, errorCb, options);
};
