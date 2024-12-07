import express, { Request, Response } from 'express';
import googleTrendsClient from './googleTrendsClient';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());  // To parse JSON bodies

// Route for Autocomplete
app.get('/trends/autocomplete', async (req: Request, res: Response) => {
  const { term } = req.query;

  if (!term || typeof term !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid term for autocomplete' });
  }

  try {
    const data = await googleTrendsClient.fetchAutoComplete(term);
    res.json({ term, data });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching autocomplete data' });
  }
});

// Route for Daily Trends
app.get('/trends/daily', async (req: Request, res: Response) => {
  const { geo = 'US' } = req.query;

  try {
    const data = await googleTrendsClient.fetchDailyTrends(geo.toString());
    res.json({ geo, data });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching daily trends' });
  }
});

// Route for Interest Over Time
app.get('/trends/interestOverTime', async (req: Request, res: Response) => {
  const { keyword, startTime } = req.query;

  if (!keyword || typeof keyword !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid keyword for interest over time' });
  }

  try {
    const data = await googleTrendsClient.fetchInterestOverTime(keyword, new Date(startTime || new Date().setMonth(new Date().getMonth() - 1)));
    res.json({ keyword, data });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching interest over time data' });
  }
});

// Route for Interest By Region
app.get('/trends/interestByRegion', async (req: Request, res: Response) => {
  const { keyword, geo = 'US', startTime } = req.query;

  if (!keyword || typeof keyword !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid keyword' });
  }

  try {
    const data = await googleTrendsClient.fetchInterestByRegion(keyword, new Date(startTime || new Date().setMonth(new Date().getMonth() - 1)), geo.toString());
    res.json({ keyword, geo, data });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching interest by region data' });
  }
});

// Route for Real-Time Trends
app.get('/trends/realTime', async (req: Request, res: Response) => {
  const { geo = 'US' } = req.query;

  try {
    const data = await googleTrendsClient.fetchRealTimeTrends(geo.toString());
    res.json({ geo, data });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching real-time trends' });
  }
});

// Route for Related Queries
app.get('/trends/relatedQueries', async (req: Request, res: Response) => {
  const { keyword } = req.query;

  if (!keyword || typeof keyword !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid keyword' });
  }

  try {
    const data = await googleTrendsClient.fetchRelatedQueries(keyword);
    res.json({ keyword, data });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching related queries' });
  }
});

// Route for Related Topics
app.get('/trends/relatedTopics', async (req: Request, res: Response) => {
  const { keyword } = req.query;

  if (!keyword || typeof keyword !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid keyword' });
  }

  try {
    const data = await googleTrendsClient.fetchRelatedTopics(keyword);
    res.json({ keyword, data });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching related topics' });
  }
});

// Batch Route for Multiple Keywords
app.post('/trends/batch', async (req: Request, res: Response) => {
  const { keywords } = req.body; // Expecting an array of keywords in the request body

  if (!Array.isArray(keywords) || keywords.length === 0) {
    return res.status(400).json({ error: 'Please provide an array of keywords for batch processing' });
  }

  const results: any[] = [];

  // Process each keyword
  for (const keyword of keywords) {
    try {
      const trendData = await googleTrendsClient.fetchInterestOverTime(keyword);
      results.push({ keyword, data: trendData });
    } catch (error) {
      results.push({ keyword, error: 'Error fetching trend data' });
    }
  }

  res.json({ results });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
