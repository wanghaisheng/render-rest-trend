// First, create proper interfaces for the API options
export interface BaseOptions {
  keyword: string;
}

export interface TimeOptions extends BaseOptions {
  startTime: Date;
}

export interface RegionOptions extends TimeOptions {
  geo: string;
}

export interface GeoOptions {
  geo: string;
}

export interface TrendDateOptions {
  trendDate: Date;
  geo: string;
}