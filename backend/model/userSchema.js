const mongoDB = require("mongoose");

const userSchema = new mongoDB.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoDB.model("User", userSchema);
