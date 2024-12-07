// src/google-trends-api.d.ts
declare module 'google-trends-api' {
    export default {
      autoComplete: (options: { keyword: string }) => Promise<string>;
      dailyTrends: (options: { trendDate: Date; geo: string }) => Promise<string>;
      interestOverTime: (options: { keyword: string; startTime: Date }) => Promise<string>;
      interestByRegion: (options: { keyword: string; startTime: Date; geo: string }) => Promise<string>;
      realTimeTrends: (options: { geo: string }) => Promise<string>;
      relatedQueries: (options: { keyword: string }) => Promise<string>;
      relatedTopics: (options: { keyword: string }) => Promise<string>;
    };
  }
  