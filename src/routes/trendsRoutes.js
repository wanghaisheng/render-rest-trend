import express from 'express';
import googleTrendsClient from '../lib/googleTrendsClient';

const router = express.Router();

// Autocomplete endpoint
router.get('/autocomplete', async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({ error: 'Please provide a keyword' });
  }
  try {
    const data = await googleTrendsClient.fetchAutoComplete(keyword);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Interest Over Time endpoint
router.get('/interest-over-time', async (req, res) => {
  const { keyword, startTime } = req.query;
  if (!keyword) {
    return res.status(400).json({ error: 'Please provide a keyword' });
  }
  try {
    const data = await googleTrendsClient.fetchInterestOverTime(keyword, new Date(startTime));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Daily Trends endpoint
router.get('/daily-trends', async (req, res) => {
  const { geo } = req.query;
  try {
    const data = await googleTrendsClient.fetchDailyTrends(geo);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Related Queries endpoint
router.get('/related-queries', async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({ error: 'Please provide a keyword' });
  }
  try {
    const data = await googleTrendsClient.fetchRelatedQueries(keyword);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// New endpoint for Keyword List (batch processing)
router.post('/batch-trends', async (req, res) => {
  const { keywords, startTime } = req.body;

  // Ensure keywords is an array
  if (!Array.isArray(keywords) || keywords.length === 0) {
    return res.status(400).json({ error: 'Please provide a non-empty list of keywords' });
  }

  try {
    // Fetch trends for each keyword
    const trendsResults = [];
    for (let i = 0; i < keywords.length; i++) {
      const keyword = keywords[i];
      const trendData = await googleTrendsClient.fetchInterestOverTime(keyword, new Date(startTime));
      trendsResults.push({ keyword, trendData });
    }

    res.json({ results: trendsResults });
  } catch (error) {
    console.error('Error fetching batch trends data:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
