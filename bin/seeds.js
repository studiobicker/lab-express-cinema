//make connection
//insert data
//close connection

//mongoose
//user model
// data
const mongoose = require("mongoose");
const Movie = require(__dirname + "/../models/Movie");
const movieData = require(__dirname + "/data");

mongoose
  .connect("mongodb://localhost:27017/movieDb", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
    return Movie.deleteMany({});
  })
  .then(success => {
    return Movie.insertMany(movieData);
  })
  .then(success => {
    console.log("successfully inserted data");
  })
  .catch(err => {
    console.error("Error", err);
  });
