const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
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
  })
);

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
