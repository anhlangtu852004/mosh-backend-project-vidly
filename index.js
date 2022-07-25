const mongoose = require("mongoose");

require("dotenv").config();
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const user = require("./routes/users");
const authen = require("./routes/authens");
const express = require("express");
const app = express();

// if (!config.get("jwtPrivateKey")) {
//   console.error("jwtPrivateKey is not define");
//   process.exit(1);
// }

if (!process.env.vidly_jwtPrivateKey) {
  console.error("jwtPrivateKey is not define");
  process.exit(1);
}

mongoose
  .connect("mongodb://127.0.0.1/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/users", user);
app.use("/api/authens", authen);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
