import express from 'express';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

config();

import connectDB from './database/connectDatabase.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'assets')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.render('welcome')
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});