@@ -1,7 +1,8 @@
 import express from 'express';
 import cors from 'cors';
 import dotenv from 'dotenv';
 import { rateLimit } from 'express-rate-limit';
+import path from 'path';
 import authRoutes from './routes/auth';
 import walletRoutes from './routes/wallets';
 import tokenRoutes from './routes/tokens';
@@ -9,7 +10,9 @@
 
-dotenv.config();
+dotenv.config({
+  path: path.resolve(__dirname, '../../server/.env')
+});
 
 const app = express();
 const port = process.env.PORT || 3000;