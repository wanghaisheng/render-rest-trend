export interface TrendsResponse<T = any> {
  data: T;
  error?: string;
  keyword?: string;
  term?: string;
  geo?: string;
}

export interface TrendsOptions {
  keyword: string;
  startTime?: Date;
  geo?: string;
}

export interface BatchTrendsResponse {
  results: TrendsResponse[];
}