const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 1024,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.vidly_jwtPrivateKey
  );

  return token;
};
//co the tao static method cho class cha( class User)
// userSchema.statics.lookup = function(){
//   ///// logic here
// }

const User = mongoose.model("User", userSchema);

function validateUser(bodyRes) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(1024).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(bodyRes);
}

exports.User = User;
exports.validateUser = validateUser;
