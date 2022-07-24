const { Authen, validateAuthen } = require("../models/authen");
const { User, validateUser } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// router.get('/', async (req, res) => {
//   const movies = await Movie.find().sort('name');
//   res.send(movies);
// });

router.post("/", async (req, res) => {
  const { error } = validateAuthen(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid user or password");

  const inValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!inValidPassword) return res.status(400).send("Invalid user or password");
  const token = jwt.sign({ _id: user._id }, process.env.vidly_jwtPrivateKey);
  res.send(token);
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
