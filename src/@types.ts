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

export type Preset = {
  id?: string;
  staticTopics: string;
  dynamicTopics: string;
  formats: string;
  resolution: string;
  orientation?: string;
  skin: string;
  fileSize: string;
};

export type ImageJson = {
  path: string;
  size: string;
}
