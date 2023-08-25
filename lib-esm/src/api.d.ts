import { WeatherResp } from './@types';
export type getCurrentWeatherParams = {
    latitude: number;
    longitude: number;
};
export declare function getCurrentWeather({ latitude, longitude }: getCurrentWeatherParams): Promise<WeatherResp>;
export declare function getHourlyWeather({ latitude, longitude }: getCurrentWeatherParams): Promise<WeatherResp>;
export declare function getDailyWeather({ latitude, longitude }: getCurrentWeatherParams): Promise<WeatherResp>;
