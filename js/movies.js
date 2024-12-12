import MoviesList from "./MoviesModule.mjs";
import { getGenreId } from "./MoviesModule.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// need to get genre from the user here
const category = getGenreId("Action");

//
const moviesList = new MoviesList(".movies-grid", 3, category);
moviesList.init();
