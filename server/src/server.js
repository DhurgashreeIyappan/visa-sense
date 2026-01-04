import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cardRoutes from './routes/cardRoutes.js';
import benefitsRoutes from './routes/benefitsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/card', cardRoutes);
app.use('/api/benefits', benefitsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'VISA-SENSE API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
