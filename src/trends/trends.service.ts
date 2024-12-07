import { Injectable } from '@nestjs/common';
import GoogleTrends from 'google-trends-api';
import {
  BaseOptions,
  TimeOptions,
  RegionOptions,
  GeoOptions,
  TrendDateOptions,
} from './interfaces/google-trends.interface';

@Injectable()
export class TrendsService {
  private defaultStartTime(): Date {
    return new Date(new Date().setMonth(new Date().getMonth() - 1));
  }

  async fetchAutoComplete(term: string) {
    try {
      const options: BaseOptions = { 
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
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
      const options: TrendDateOptions = {
        trendDate: startDate,
        geo,
      };
      const data = await GoogleTrends.dailyTrends(options);
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error fetching daily trends');
    }
  }

  async fetchInterestOverTime(
    keyword: string,
    startTime?: Date
  ) {
    try {
      const options: TimeOptions = {
        keyword,
        startTime: startTime || this.defaultStartTime(),
      };
      const data = await GoogleTrends.interestOverTime(options);
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error fetching interest over time');
    }
  }

  async fetchInterestByRegion(
    keyword: string,
    startTime?: Date,
    geo: string = 'US'
  ) {
    try {
      const options: RegionOptions = {
        keyword,
        startTime: startTime || this.defaultStartTime(),
        geo,
      };
      const data = await GoogleTrends.interestByRegion(options);
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error fetching interest by region');
    }
  }

  async fetchRealTimeTrends(geo: string = 'US') {
    try {
      const options: GeoOptions = { 
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
      const options: BaseOptions = { 
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
      const options: BaseOptions = { 
        keyword 
      };
      const data = await GoogleTrends.relatedTopics(options);
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error fetching related topics');
    }
  }
}
