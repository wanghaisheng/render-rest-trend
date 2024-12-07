// src/googleTrendsClient.ts
import GoogleTrends from 'google-trends-api';

const googleTrendsClient = {
  async fetchAutoComplete(term: string) {
    try {
      const data = await GoogleTrends.autoComplete({ keyword: term });
      return JSON.parse(data);
    } catch (error) {
      console.error('Error fetching autocomplete data:', error);
      throw new Error('Error fetching autocomplete data');
    }
  },

  async fetchDailyTrends(geo = 'US') {
    try {
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

      const data = await GoogleTrends.dailyTrends({
        trendDate: startDate,
        geo
      });
      return JSON.parse(data);
    } catch (error) {
      console.error('Error fetching daily trends:', error);
      throw new Error('Error fetching daily trends');
    }
  },

  async fetchInterestOverTime(keyword: string, startTime: Date = new Date(new Date().setMonth(new Date().getMonth() - 1))) {
    try {
      const data = await GoogleTrends.interestOverTime({
        keyword,
        startTime
      });
      return JSON.parse(data);
    } catch (error) {
      console.error('Error fetching interest over time:', error);
      throw new Error('Error fetching interest over time');
    }
  },

  async fetchInterestByRegion(keyword: string, startTime: Date = new Date(new Date().setMonth(new Date().getMonth() - 1)), geo = 'US') {
    try {
      const data = await GoogleTrends.interestByRegion({
        keyword,
        startTime,
        geo
      });
      return JSON.parse(data);
    } catch (error) {
      console.error('Error fetching interest by region:', error);
      throw new Error('Error fetching interest by region');
    }
  },

  async fetchRealTimeTrends(geo = 'US') {
    try {
      const data = await GoogleTrends.realTimeTrends({ geo });
      return JSON.parse(data);
    } catch (error) {
      console.error('Error fetching real-time trends:', error);
      throw new Error('Error fetching real-time trends');
    }
  },

  async fetchRelatedQueries(keyword: string) {
    try {
      const data = await GoogleTrends.relatedQueries({ keyword });
      return JSON.parse(data);
    } catch (error) {
      console.error('Error fetching related queries:', error);
      throw new Error('Error fetching related queries');
    }
  },

  async fetchRelatedTopics(keyword: string) {
    try {
      const data = await GoogleTrends.relatedTopics({ keyword });
      return JSON.parse(data);
    } catch (error) {
      console.error('Error fetching related topics:', error);
      throw new Error('Error fetching related topics');
    }
  }
};

export default googleTrendsClient;
