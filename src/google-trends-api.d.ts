// src/google-trends-api.d.ts
declare module 'google-trends-api' {
  
    // Define the possible return types for each function
    interface AutoCompleteResult {
      query: string;
      suggestions: string[];
    }
  
    interface Trend {
      trendDate: string;
      trendValues: any[]; // Modify this to match the actual data structure
    }
  
    interface InterestOverTime {
      time: string;
      value: number[];
    }
  
    interface RelatedQueries {
      query: string;
      value: number;
    }
  
    // Define the structure of the Google Trends API functions
    export default {
      autoComplete: (options: { keyword: string }): Promise<AutoCompleteResult>;
      dailyTrends: (options: { trendDate: Date; geo: string }): Promise<Trend[]>;
      interestOverTime: (options: { keyword: string; startTime: Date }): Promise<InterestOverTime[]>;
      interestByRegion: (options: { keyword: string; startTime: Date; geo: string }): Promise<any>;
      realTimeTrends: (options: { geo: string }): Promise<any>;
      relatedQueries: (options: { keyword: string }): Promise<RelatedQueries[]>;
      relatedTopics: (options: { keyword: string }): Promise<any>;
    };
  }
  