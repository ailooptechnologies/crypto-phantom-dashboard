import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import path from 'path';
import authRoutes from './routes/auth';
import walletRoutes from './routes/wallets';
import tokenRoutes from './routes/tokens';
import { errorHandler } from './middleware/auth';

dotenv.config({
  path: path.resolve(__dirname, '../../server/.env')
});

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallets', errorHandler, walletRoutes);
app.use('/api/tokens', errorHandler, tokenRoutes);

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  console.log('⚡️ Environment:', process.env.NODE_ENV || 'development');
});