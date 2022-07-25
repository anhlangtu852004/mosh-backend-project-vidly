const { User, validateUser } = require("../models/user");
const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");

//midleware
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already Register.");

  //   let user = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password,
  //   });

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();

  res
    .header("x-token-auth", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

// router.put('/:id', async (req, res) => {
//   const { error } = validate(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const genre = await Genre.findById(req.body.genreId);
//   if (!genre) return res.status(400).send('Invalid genre.');

//   const movie = await Movie.findByIdAndUpdate(req.params.id,
//     {
//       title: req.body.title,
//       genre: {
//         _id: genre._id,
//         name: genre.name
//       },
//       numberInStock: req.body.numberInStock,
//       dailyRentalRate: req.body.dailyRentalRate
//     }, { new: true });

//   if (!movie) return res.status(404).send('The movie with the given ID was not found.');

//   res.send(movie);
// });

// router.delete('/:id', async (req, res) => {
//   const movie = await Movie.findByIdAndRemove(req.params.id);

//   if (!movie) return res.status(404).send('The movie with the given ID was not found.');

//   res.send(movie);
// });

// router.get('/:id', async (req, res) => {
//   const movie = await Movie.findById(req.params.id);

//   if (!movie) return res.status(404).send('The movie with the given ID was not found.');

//   res.send(movie);
// });

module.exports = router;
