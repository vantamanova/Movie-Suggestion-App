import { renderListWithTemplate } from "./utils.mjs"
import ExternalServices from "./utils.mjs";

// Template for movie card
function movieCardTemplate(movie) {
    return `
    <div class="movie-card">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.original_title} poster">
        <div class="movie-info">
            <h3>${movie.original_title}</h3>
            <p>${movie.overview}</p>
            <button class="outline">View Details</button>
        </div>
    </div>`
}
 
// 
export default class MoviesList {
    constructor(selector, dataSourse) {
        this.selector = selector;
        this.dataSourse = dataSourse;
    }

    async init() {
        // Parent element
        const element = document.querySelector(this.selector)
        renderListWithTemplate(movieCardTemplate, element, this.dataSourse)
    }
}


// Get Movie Genre ID
export async function getGenreId(genreName, type) {
    // Geting the list of all movie genres
    let params = `/genre/${type}/list?language=en`;
    const dataSourse = new ExternalServices();
    let data = await dataSourse.getData(params);

    const genre = data.genres.find(genre => genre.name === genreName);

    // Return genre ID or null  
    if (genre) {
        return genre.id;
    } else {
        return null;
    }  
}

