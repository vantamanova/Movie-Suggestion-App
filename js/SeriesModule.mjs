import { getData, renderListWithTemplate } from "./utils.mjs"

// Template for movie card
function movieCardTemplate(movie) {
    return `
    <div class="movie-card">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.original_title} poster">
        <div class="movie-info">
            <h3>${movie.name}</h3>
            <p>${movie.overview}</p>
            <button class="outline">View Details</button>
        </div>
    </div>`
}

// 
export default class SeriesList {
    constructor() {
    }

    async init() {
        const list = await this.popularMovies();
        const firstFive = list.slice(0, 5);

        // Parent element
        const element = document.querySelector(".best-series")
        renderListWithTemplate(movieCardTemplate, element, firstFive)
    }

    // Get popular movies
    async popularMovies() {
        let params = `/tv/top_rated?language=en-US&page=1`;
        let data = await getData(params);
        return data.results;
    }
}