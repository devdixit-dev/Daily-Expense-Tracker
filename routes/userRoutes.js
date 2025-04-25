import express from 'express';
import { addYourExpense, deleteExpense, ForgotPassword, getAddYourExpense, getDashboard, getForgotPassword, getLogin, getProfile, getSettings, getSignup, Login, Logout, Signup, UpdateInfo } from '../controllers/userController.js';
import UserAuth from '../middlewares/UserAuth.js';

const userRouter = express.Router();

// GET
userRouter.get('/signup', getSignup);

userRouter.get('/login', getLogin);

userRouter.get('/forgot-password', getForgotPassword);

userRouter.get('/dashboard', UserAuth, getDashboard);

userRouter.get('/add-your-expense', getAddYourExpense);

userRouter.get('/settings', UserAuth, getSettings);

userRouter.get('/profile', UserAuth, getProfile);

// POST
userRouter.post('/signup', Signup);

userRouter.post('/login', Login);

userRouter.post('/logout', UserAuth, Logout);

userRouter.post('/forgot-password', ForgotPassword);

userRouter.post('/add-your-expense', UserAuth, addYourExpense);

userRouter.post('/delete/:id', UserAuth, deleteExpense);

userRouter.post('/update-info', UserAuth, UpdateInfo);

export default userRouter;