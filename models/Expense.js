import mongoose from "mongoose";

const expense_schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  expenseName: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  expenseCreatedAt: { type: String, default: Date.now }
});

const Expense = mongoose.model('expenses', expense_schema);

export default Expense;