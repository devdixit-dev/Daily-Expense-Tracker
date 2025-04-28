import Expense from '../models/Expense.js';
import User from '../models/User.js'
import bcrypt from 'bcryptjs'

// GET
export const getDashboard = async (req, res) => {
  const user = req.user

  const name = user.username.charAt(0).toUpperCase();

  const expenses = await Expense.find();

  res.render('dashboard', { name, expenses });
}

export const getSignup = async (req, res) => {
  res.render('signup');
}

export const getLogin = async (req, res) => {
  res.render('login');
}

export const getForgotPassword = async (req, res) => {
  res.render('forgot-password');
}

export const getAddYourExpense = async (req, res) => {
  res.render('add-your-expense');
}

export const getSettings = async (req, res) => {
  res.render('settings')
}

export const getProfile = async (req, res) => {
  const user = req.user;
  res.render('profile', {user});
}

export const getAboutUs = async (req, res) => {
  res.render('about-us')
}

export const getProjectInfo = async (req, res) => {
  res.render('project-info')
}

// POST
export const Signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {

    if (!username || !email || !password) {
      alert('All fields are required');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashPassword });

    res.redirect('/user/login')

  }
  catch (error) {
    return res.staus(500).send(`Internal Server Error - ${error}`);
  }

}

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.send('All fields are required');
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.send('User not found')
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.send('Incorrect email or password')
    }

    res.cookie('token', encodeURI(user._id), {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000 // 1hour
    })
    res.redirect('/user/dashboard');

  }
  catch (error) {
    console.log(`Internal Server Error - ${error}`);
  }

}

export const Logout = async (req, res) => {
  res.clearCookie('token');
  res.redirect('/')
}

export const ForgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {

    if (!email || !newPassword) {
      res.send('All fields are required');
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.send('User not found')
    }

    const checkPassword = await bcrypt.compare(newPassword, user.password);

    if (checkPassword) {
      res.send('Old password and new password will be not same')
    }

    const decodePassword = await bcrypt.hash(newPassword, 10);

    user.password = decodePassword
    user.save();
    res.redirect('/user/login');
  }
  catch (error) {
    return res.status(500).send(`Internal Server Error - ${error}`);
  }
}

export const addYourExpense = async (req, res) => {
  const user = req.user;

  const getId = user._id

  const { expenseName, category, amount } = req.body;

  if (!expenseName || !category || !amount) {
    res.render('/user/add-your-expense')
  }

  const timestamp = Date.now();

  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const dateTime = `${day}/${month} - ${hours}:${minutes}`;

  const expense = await Expense.create({
    userId: getId,
    expenseName,
    category,
    amount,
    expenseCreatedAt: dateTime
  });

  user.expenseNotes = expense._id
  expense.save();
  user.save();


  res.redirect('/user/dashboard');

}

export const deleteExpense = async (req, res) => {
  const id = req.params.id;

  try {
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.redirect('/user/dashboard');
    }

    // 1. Delete expense
    await Expense.deleteOne({ _id: id });

    // 2. Remove expense ID from user's expenseNotes array
    const user = await User.findOne({ _id: expense.userId });

    if (user) {
      user.expenseNotes = user.expenseNotes.filter(expId => !expId.equals(expense._id));
      await user.save();
    }

    res.redirect('/user/dashboard');
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const UpdateInfo = async (req, res) => {
  const { updatedUsername, updatedEmail, oldPassword, newPassword } = req.body;
  const getUser = req.user

  try{

    const user = await User.findOne({ _id: getUser._id });

    if(!user) {
      res.redirect('/user/settings');
    }

    const checkPassword = await bcrypt.compare(oldPassword, user.password);

    if(!checkPassword) {
      res.redirect('/user/settings');
    }

    const decodePassword = await bcrypt.hash(newPassword, 10)

    user.username = updatedUsername
    user.email = updatedEmail
    user.password = decodePassword

    user.save();

    res.redirect('/user/dashboard');

  }
  catch(error){
    res.send(`Internal Server Error - ${error}`);
  }
}