import MoviesList from "./MoviesModule.mjs";
import ExternalServices from "./utils.mjs";
import { getGenreId } from "./MoviesModule.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
let selectedGenre;

// Get genre from the user
document.getElementById("apply-filters").addEventListener("click", async () => {
    const genreSelect = document.getElementById("genre");
    selectedGenre = genreSelect.value;
    console.log("You selected: ", selectedGenre);

    try {
        // Get the genre ID
        const category = await getGenreId(selectedGenre, "tv");

        // Creates List of top-rated movies
        const moviesElement = document.querySelector(".movies-grid");

        // Clear previous results
        moviesElement.innerHTML = "";

        const moviesDataSourse = new ExternalServices();
        let moviesData = await moviesDataSourse.getData(`/discover/tv?with_genres=${category}`);
        moviesData = moviesData.results.slice(0, 20);

        let movieList = new MoviesList(".movies-grid", moviesData, "tv");
        movieList.init();
    } catch (error) {
        console.error("Error:", error);
    }
});
