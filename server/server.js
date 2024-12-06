import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import newsRoutes from './routes/naujienos.js';

dotenv.config();

// Express app
const app = express();

// Middleware
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/news', newsRoutes);

// Start server
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log('Prisijungta prie MongoDB');
  })
  .catch((err) => {
    console.log(`Klaida jungiantis į MongoDB:`, err, message);
  });

// Testing endpoint
app.get('/', (req, res) => {
  res.send('API test');
});

app.listen(process.env.PORT, () => {
  console.log(`Serveris pajungtas ant ${process.env.PORT} porto`);
});
