import express from 'express';
import trendsRoutes from './routes/trendsRoutes';

const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Routes
app.use('/api/v1', trendsRoutes);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
