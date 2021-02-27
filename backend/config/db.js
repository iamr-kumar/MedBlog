// MongoDB connection
const mongoose = require("mongoose");
require("dotenv").config();

const db = process.env.MONGODB_URI;

const connectDB = () => {
  mongoose
    .connect(
      db,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    )
    .then(console.log("MongoDB connected!"))
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
