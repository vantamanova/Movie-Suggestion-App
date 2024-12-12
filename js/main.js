import MoviesList from "./MoviesModule.mjs";
import SeriesList from "./SeriesModule.mjs";
import { getData, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
let movieList = new MoviesList();
movieList.init();

let seriesList = new SeriesList();
seriesList.init();


