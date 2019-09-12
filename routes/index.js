const express = require("express");
const router = express.Router();

//require movie model
const Movie = require(__dirname + "/../models/Movie.js");

/* GET home page. */
router.get("/", function(req, res) {
  res.render("index", { title: "Cinema Ironhack" });
});

/* GET list of movies */
router.get("/movies", function(req, res) {
  //find all movies
  Movie.find()
    .then(allMovies => {
      debugger;
      res.render("movies", { allMovies: allMovies });
    })
    .catch(err => {
      console.error("Error", err);
    });
});
/* GET single move */
router.get("/readMovie/:id/", (req, res) => {
  const id = req.params.id;

  Movie.findById(id)
    .then(movie => {
      res.render("readMovie", { movie: movie });
    })
    .catch(err => {
      console.error("Error", err);
    });
});
router.get("/addMovie", (req, res) => {
  res.render("editMovie", { title: "Add Movie" });
});

router.get("/editMovie/:id/", (req, res) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
    .then(movie => {
      res.render("editMovie", { movie: movie, title: "Edit Movie" });
    })
    .catch(err => {
      console.error("Error", err);
    });
});

router.post("/updateMovie/:id", (req, res, next) => {
  const movieId = req.params.id;

  /*
   * Create a new object with all of the information from the request body.
   * This correlates directly with the schema of Product
   */
  const movieUpdates = {
    title: req.body.title,
    director: req.body.director,
    description: req.body.description
  };

  Movie.findByIdAndUpdate(movieId, movieUpdates, (err, movie) => {
    if (err) {
      return next(err);
    }
    res.redirect("/movies");
  });
});

router.post("/updateMovie", (req, res, next) => {
  /*
   * Create a new object with all of the information from the request body.
   * This correlates directly with the schema of Product
   */
  const movieUpdates = {
    title: req.body.title,
    director: req.body.director,
    description: req.body.description
  };

  Movie.create(movieUpdates, (err, movie) => {
    if (err) {
      return next(err);
    }
    res.redirect("/movies");
  });
});

router.get("/deleteMovie/:id", (req, res, next) => {
  const id = req.params.id;

  Movie.findByIdAndRemove(id, (err, movie) => {
    if (err) {
      return next(err);
    }
    res.redirect("/movies");
  });
});

module.exports = router;
