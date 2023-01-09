const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewURLParser: true,
  });
  console.log("MongoDB Connected");
};

module.exports = connectDB;
