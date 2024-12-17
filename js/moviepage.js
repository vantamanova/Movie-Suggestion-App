import { loadHeaderFooter, attachSearchHandler } from "./utils.mjs";
import MovieDetails from "./MovieDetails.mjs";

loadHeaderFooter(() => {
    attachSearchHandler("search-button", "search-input", "search.html");
});

// get movie ID from somewhere
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");
const imdbId = params.get("imdbId");

const movieDetails = new MovieDetails(id, type, imdbId);
movieDetails.init();




