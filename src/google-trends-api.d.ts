import {
  BaseOptions,
  TimeOptions,
  RegionOptions,
  GeoOptions,
  TrendDateOptions,
} from './trends/interfaces/google-trends.interface';

declare module 'google-trends-api' {
  export function autoComplete(options: BaseOptions): Promise<string>;
  export function dailyTrends(options: TrendDateOptions): Promise<string>;
  export function interestOverTime(options: TimeOptions): Promise<string>;
  export function interestByRegion(options: RegionOptions): Promise<string>;
  export function realTimeTrends(options: GeoOptions): Promise<string>;
  export function relatedQueries(options: BaseOptions): Promise<string>;
  export function relatedTopics(options: BaseOptions): Promise<string>;
}