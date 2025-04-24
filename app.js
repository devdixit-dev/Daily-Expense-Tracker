import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './database/connectDatabase.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

connectDB();

app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'assets')));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser())

app.use('/user', userRouter);


app.get('/', (req, res) => {
  res.render('welcome')
});

app.get('/user/signup', (req, res) => {
  res.render('signup');
});

app.get('/user/login', (req, res) => {
  res.render('login');
});

app.get('/user/forgot-password', (req, res) => {
  res.render('forgot-password')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});   