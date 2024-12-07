declare module 'google-trends-api' {
  interface BaseOptions {
    keyword: string;
  }

  interface GeoOptions {
    geo: string;
  }

  interface DateOptions {
    startTime: Date;
  }

  interface TrendDateOptions extends GeoOptions {
    trendDate: Date;
  }

  interface InterestOptions extends BaseOptions, DateOptions {
    geo?: string;
  }

  interface RegionOptions extends BaseOptions, DateOptions, GeoOptions {}
  export function autoComplete(options: BaseOptions): Promise<string>;
  export function dailyTrends(options: TrendDateOptions): Promise<string>;
  export function interestOverTime(options: InterestOptions): Promise<string>;
  export function interestByRegion(options: RegionOptions): Promise<string>;
  export function realTimeTrends(options: GeoOptions): Promise<string>;
  export function relatedQueries(options: BaseOptions): Promise<string>;
  export function relatedTopics(options: BaseOptions): Promise<string>;
}