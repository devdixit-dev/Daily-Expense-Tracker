import mongoose from "mongoose";

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI, {dbName: 'daily-expense-tracker'})
  .then(() => { console.log(`DB Connected`) })
  .catch((e) => { console.log(`Error connecting DB: ${e}`) })
}

export default connectDB;