const MONGOOSE = require("mongoose");
require("dotenv").config();

const connect = async () => {
  try {
    await MONGOOSE.connect(process.env.MONGO_URI);

    console.log("Connected to Mongoose successfully!");
  } catch (error) {
    console.error("Mongoose connection failed:", error.message);
  }
};

module.exports = connect;
