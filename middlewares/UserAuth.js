import User from "../models/User.js";

const UserAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).redirect('/user/login')
    }

    const user = await User.findById(token);

    if (!user) {
      return res.status(404).redirect('/user/login')
    }

    req.user = user;
    next();
  }
  catch(error) {
    res.send(`Internal server error - ${error}`);
  }
}

export default UserAuth;