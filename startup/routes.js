const express = require("express");

const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const user = require("../routes/users");
const authen = require("../routes/authens");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/users", user);
  app.use("/api/authens", authen);
  app.use(error);
};
