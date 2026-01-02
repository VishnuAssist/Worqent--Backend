import Movie from "../models/movie.model.js";

// get
export const MovieGet = async (req, res) => {
  try {
        const { title } = req.query;

    let filter = {};

    if (title) {
      filter.title = {
        $regex: title,
        $options: "i", // case-insensitive
      };
    }

    const movies = await Movie.find(filter);
    
    // const movies = await Movie.find();
     res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get by id
export const MovieGetById = async (req, res) => {
  try {
    const movies = await Movie.findById(req.params.id);
    if (movies == null) {
      return res.status(404).json({ message: "can not find the movie" });
    } else {
      res.json(movies);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// post

export const MovieCreate = async (req, res) => {
  const newMovie = new Movie({
    title: req.body.title,
    desc: req.body.desc,
  });

  try {
    const movie = await newMovie.save();
    return res.status(201).json(movie);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//update

export const MovieUpdate = async (req, res) => {
  try {
    const updateMovie = await Movie.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        desc: req.body.desc,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updateMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete

export const MovieDelete = async (req, res) => {
  const movieId = req.params.id;
  try {
    await Movie.deleteOne({ _id: movieId });
    res.json({ message: "Movie deleted" });
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};
