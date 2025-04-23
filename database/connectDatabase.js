import mongoose from "mongoose";

const connectDB = () => {
  mongoose.connect('mongodb://localhost:27017/', {dbName: 'daily-expense-tracker'})
  .then(() => { console.log(`DB Connected`) })
  .catch((e) => { console.log(`Error connecting DB: ${e}`) })
}

export default connectDB;