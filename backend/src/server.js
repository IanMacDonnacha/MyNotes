import express from 'express';
import cors from 'cors';
import path from 'path';
import notesRoutes from './routes/notesRoutes.js';
import rateLimiter from './middleware/rateLimiter.js';
import { connectDB } from './config/db.js';

const app = express();
const __dirname = path.resolve();

// middleware - always before routes
if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
    })
  );
}
app.use(express.json()); // Allows access to req.body
app.use(rateLimiter);

// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// })

// API routes
app.use('/api/notes', notesRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

connectDB().then(() => {
  app.listen(5001, () => {
    console.log('Server started on PORT: 5001');
  });
});
