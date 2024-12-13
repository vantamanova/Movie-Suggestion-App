import { loadHeaderFooter } from "./utils.mjs";
import MovieDetails, { moviePageTemplate, seriesPageTemplate } from "./MovieDetails.mjs";
import ExternalServices from "./utils.mjs";

loadHeaderFooter();

// get movie ID from somewhere
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

console.log(id);
console.log(type);

//let movieId = 912649;

// find movie by ID

// display this movie

const movieDetails = new MovieDetails(id, type);
movieDetails.init();

