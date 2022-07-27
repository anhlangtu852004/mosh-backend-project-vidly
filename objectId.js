const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const user = {
  _id: mongoose.Types.ObjectId().toHexString(),
  _id2: mongoose.Types.ObjectId().toString(),
  _id3: mongoose.Types.ObjectId(),
  isAdmin: true,
};

const token = jwt.sign({ _id: user._id }, process.env.vidly_jwtPrivateKey);

console.log(token);
// console.log(user._id);
// console.log(user._id2);
// console.log(user._id3);
