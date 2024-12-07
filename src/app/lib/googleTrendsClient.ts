import { Injectable } from '@nestjs/common';
import GoogleTrends from 'google-trends-api';

// Define exact types that match the API requirements
type AutoCompleteOptions = { keyword: string };
type DailyTrendsOptions = { trendDate: Date; geo: string };
type InterestTimeOptions = { keyword: string; startTime: Date };
type InterestRegionOptions = { keyword: string; startTime: Date; geo: string };
type RealTimeTrendsOptions = { geo: string };
type RelatedQueryOptions = { keyword: string };
@Injectable()
export class GoogleTrendsClient {
  private ensureDate(date?: Date | string): Date {
    if (!date) {
      return new Date(new Date().setMonth(new Date().getMonth() - 1));
    }
    return date instanceof Date ? date : new Date(date);
  }

  async fetchAutoComplete(term: string) {
    try {
      const options: AutoCompleteOptions = {
        keyword: term
      };
      const data = await GoogleTrends.autoComplete(options);
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error fetching autocomplete data');
    }
  }

  async fetchDailyTrends(geo: string = 'US') {
    try {
      const options: DailyTrendsOptions = {
        trendDate: new Date(),
        geo
      };
      const data = await GoogleTrends.dailyTrends(options);
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error fetching daily trends');
    }
  }

  async fetchInterestOverTime(keyword: string, startTime?: Date | string) {
    try {
      const options: InterestTimeOptions = {
        keyword,
        startTime: this.ensureDate(startTime)
      };
      const data = await GoogleTrends.interestOverTime(options);
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error fetching interest over time');
    }
  }

  async fetchInterestByRegion(
    keyword: string, 
    startTime: Date | string | undefined, 
    geo: string = 'US'
  ) {
    try {
      const options: InterestRegionOptions = {
        keyword,
        startTime: this.ensureDate(startTime),
        geo
      };
      const data = await GoogleTrends.interestByRegion(options);
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error fetching interest by region');
    }
  }

  async fetchRealTimeTrends(geo: string = 'US') {
    try {
      const options: RealTimeTrendsOptions = {
        geo
      };
      const data = await GoogleTrends.realTimeTrends(options);
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error fetching real-time trends');
    }
  }

  async fetchRelatedQueries(keyword: string) {
    try {
      const options: RelatedQueryOptions = {
        keyword
      };
      const data = await GoogleTrends.relatedQueries(options);
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error fetching related queries');
    }
  }

  async fetchRelatedTopics(keyword: string) {
    try {
      const options: RelatedQueryOptions = {
        keyword
      };
      const data = await GoogleTrends.relatedTopics(options);
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error fetching related topics');
    }
  }
}