const { User, validateUser } = require("../models/user");
const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const router = express.Router();

// router.get('/', async (req, res) => {
//   const movies = await Movie.find().sort('name');
//   res.send(movies);
// });

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already Register.");

  //   let newUser = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password,
  //   });

  let newUser = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  await newUser.save();

  res.send(_.pick(newUser, ["_id", "name", "email"]));
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
