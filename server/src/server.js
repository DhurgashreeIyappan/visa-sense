import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cardRoutes from './routes/cardRoutes.js';
import cardTierRoutes from './routes/cardTierRoutes.js';
import benefitsRoutes from './routes/benefitsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/card', cardRoutes);
app.use('/api', cardTierRoutes); // /api/detect-card-tier
app.use('/api', benefitsRoutes); // /api/get-benefits, /api/recommend-benefits

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'VISA-SENSE API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  // Never log card numbers - sanitize error messages
  const errorMessage = err.message || 'Something went wrong!';
  console.error('Error:', errorMessage);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});