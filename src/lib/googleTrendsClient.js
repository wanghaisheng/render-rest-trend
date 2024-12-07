import GoogleTrends from 'google-trends-api';

const googleTrendsClient = {
  async fetchAutoComplete(term) {
    try {
      const data = await GoogleTrends.autoComplete({ keyword: term });
      return JSON.parse(data);
    } catch (error) {
      console.error('Error fetching autocomplete data:', error);
      throw new Error('Error fetching autocomplete data');
    }
  },

  async fetchInterestOverTime(keyword, startTime = new Date(new Date().setMonth(new Date().getMonth() - 1))) {
    try {
      const data = await GoogleTrends.interestOverTime({ keyword, startTime });
      return JSON.parse(data);
    } catch (error) {
      console.error('Error fetching interest over time:', error);
      throw new Error('Error fetching interest over time');
    }
  },

  async fetchDailyTrends(geo = 'US') {
    try {
      const today = new Date();
      const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
      const data = await GoogleTrends.dailyTrends({ trendDate: startDate, geo });
      return JSON.parse(data);
    } catch (error) {
      console.error('Error fetching daily trends:', error);
      throw new Error('Error fetching daily trends');
    }
  },

  async fetchRelatedQueries(keyword) {
    try {
      const data = await GoogleTrends.relatedQueries({ keyword });
      return JSON.parse(data);
    } catch (error) {
      console.error('Error fetching related queries:', error);
      throw new Error('Error fetching related queries');
    }
  }
};

export default googleTrendsClient;
