import { model, Schema } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Title must be at least 5 characters"],
    // maxlength: [10, "Title must be at most 10 characters"],
    trim: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

const Movie = model("Movie", schema);

export default Movie;
