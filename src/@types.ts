export type CurrentWeather = {
  is_day: 0 | 1;
  temperature: number;
  time: string;
  weathercode: number;
  winddirection: number;
  windspeed: number;
};

export type WeatherResp = {
  current_weather: CurrentWeather;
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
}
