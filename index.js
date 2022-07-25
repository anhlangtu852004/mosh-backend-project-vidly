const express = require("express");
const mongoose = require("mongoose");
require("express-async-errors");
require("dotenv").config();
const winston = require("winston");

const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const user = require("./routes/users");
const authen = require("./routes/authens");
const error = require("./middleware/error");

const app = express();

// if (!config.get("jwtPrivateKey")) {
//   console.error("jwtPrivateKey is not define");
//   process.exit(1);
// }

// process.on("uncaughtException", (ex) => {
//   console.log("we got uncaughtException.....");
//   winston.error(ex.message, ex);
// });

winston.handleException(
  new winston.transports.File({ filename: "uncaughtException.log" })
);

//khi ma promise bij reject thif process.on chup va quang throw ex. khi quang throw ex thi thang
// winston handleException chup lay
process.on("unhandledRejection", (ex) => {
  // console.log("we got unhandle rejection.....");
  // winston.error(ex.message, ex);
  throw ex;
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));

if (!process.env.vidly_jwtPrivateKey) {
  console.error("jwtPrivateKey is not define");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/users", user);
app.use("/api/authens", authen);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
