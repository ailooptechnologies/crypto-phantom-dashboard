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