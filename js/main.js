import MoviesList from "./MoviesModule.mjs";
import ExternalServices, { loadHeaderFooter, attachSearchHandler} from "./utils.mjs";

loadHeaderFooter(() => {
    attachSearchHandler("search-button", "search-input", "search.html");
});

// Creates List of top rated movies
const moviesElement = ".best-movies";

const moviesDataSourse = new ExternalServices();
let moviesData = await moviesDataSourse.getData(`/movie/top_rated?language=en-US&page=1`);

moviesData = moviesData.results.slice(0, 5); 

let movieList = new MoviesList(moviesElement, moviesData, "movie");
movieList.init();

// Creates List of top rated series
const seriesElement = ".best-series";

const seriesDataSourse = new ExternalServices();
let  seriesData = await seriesDataSourse.getData(`/tv/top_rated?language=en-US&page=1`);
seriesData = seriesData.results.slice(0, 5);

let seriesList = new MoviesList(seriesElement, seriesData, "tv");
seriesList.init();