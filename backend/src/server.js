import express from 'express';
import cors from 'cors';
import notesRoutes from './routes/notesRoutes.js';
import rateLimiter from './middleware/rateLimiter.js';
import { connectDB } from './config/db.js';
const app = express();

// middleware - always before routes
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(express.json()); // Allows access to req.body
app.use(rateLimiter);

// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// })

app.use('/api/notes', notesRoutes);

connectDB().then(() => {
  app.listen(5001, () => {
    console.log('Server started on PORT: 5001');
  });
});
