import express from 'express';
import { ForgotPassword, Login, Signup } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/signup', Signup);

userRouter.post('/login', Login)

userRouter.post('/forgot-password', ForgotPassword);

export default userRouter;