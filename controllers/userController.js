import User from '../models/User.js'
import bcrypt from 'bcrypt'

export const Signup = async (req, res) => {
  const { username, email, password } = req.body;

  try{
    
    if(!username || !email || !password){
      alert('All fields are required');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashPassword });

    res.redirect('/user/login')

  }
  catch(error) {
    return res.staus(500).send(`Internal Server Error - ${error}`);
  }

}

export const Login = async (req, res) => {
  const {email, password} = req.body;

  try{
    if(!email || !password){
      res.send('All fields are required');
    }

    const user = await User.findOne({ email });

    if(!user) {
      res.send('User not found')
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword) {
      res.send('Incorrect email or password')
    }
    
    res.cookie('token', encodeURI(user._id), {
      httpOnly: true,
      secure: true,
      maxAge: 20 * 60 * 1000 // 20min
    })
    res.json({user});

  }
  catch(error) {
    return res.send(`Internal Server Error - ${error}`);
  }
  
}

export const Logout = async (req, res) => {

}

export const ForgotPassword = async (req, res) => {
  const {email, newPassword} = req.body;

  try{

    if(!email || !newPassword){
      res.send('All fields are required');
    }

    const user = await User.findOne({ email });

    if(!user) {
      res.send('User not found')
    }

    const checkPassword = await bcrypt.compare(newPassword, user.password);

    if(checkPassword) {
      res.send('Old password and new password will be not same')
    }

    const decodePassword = await bcrypt.hash(newPassword, 10);

    user.password = decodePassword
    user.save();
    res.redirect('/user/login');
  }
  catch(error) {
    return res.status(500).send(`Internal Server Error - ${error}`);
  }
}