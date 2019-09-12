const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: "Please enter a movie title"
  },
  director: {
    type: String,
    trim: true,
    required: "Please enter the movie director"
  },
  stars: Array,
  image: String,
  description: {
    type: String,
    trim: true
  },
  showtimes: Array
});

module.exports = mongoose.model("Movie", movieSchema);
