const mongoDB = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoDB.connect(process.env.MONGO_URL);
    console.log("mongodb is connected at", conn.Connection.host);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
