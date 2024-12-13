import { loadHeaderFooter } from "./utils.mjs";
import MovieDetails from "./MovieDetails.mjs";

loadHeaderFooter();

// get movie ID from somewhere
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

console.log(id);
console.log(type);

const movieDetails = new MovieDetails(id, type);
movieDetails.init();

