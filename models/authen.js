const Joi = require("joi");
const mongoose = require("mongoose");

const Authen = mongoose.model(
  "Authen",
  new mongoose.Schema({
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

function validateAuthen(bodyRes) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(1024).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(bodyRes);
}

exports.Authen = Authen;
exports.validateAuthen = validateAuthen;
