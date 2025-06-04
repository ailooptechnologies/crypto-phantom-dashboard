const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { rateLimit } = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const walletRoutes = require('./routes/wallets');
const tokenRoutes = require('./routes/tokens');
const { authenticateToken } = require('./middleware/auth');

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