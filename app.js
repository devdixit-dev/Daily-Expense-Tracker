import express from 'express';

import connectDB from './database/connectDatabase.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

connectDB();
app.use('/user', userRouter);
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('welcome')
});

app.get('/user/signup', (req, res) => {
  res.render('signup');
});

app.get('/user/login', (req, res) => {
  res.render('login');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});   