import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import walletRoutes from './routes/wallets.js';
import tokenRoutes from './routes/tokens.js';
import { authenticateToken } from './middleware/auth.js';

dotenv.config();

const app = express();
const port = 1235

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
app.use('/api/wallets', authenticateToken, walletRoutes);
app.use('/api/tokens', authenticateToken, tokenRoutes);

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  console.log('⚡️ Environment:', process.env.NODE_ENV || 'development');
});