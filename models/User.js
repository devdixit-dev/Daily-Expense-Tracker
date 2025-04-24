import mongoose from "mongoose";

const user_schema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  expenseNotes: [{ type: mongoose.Schema.Types.ObjectId }],
  userRegisteredAt: { type: Date, default: Date.now }
});

const User = mongoose.model('users', user_schema);

export default User;