import { loadHeaderFooter } from "./utils.mjs";
import MovieDetails, { moviePageTemplate, seriesPageTemplate } from "./MovieDetails.mjs";
import ExternalServices from "./utils.mjs";

loadHeaderFooter();

// get movie ID from somewhere

let movieId = 912649;

// find movie by ID

// display this movie

const movieDetails = new MovieDetails(movieId);
movieDetails.init();
