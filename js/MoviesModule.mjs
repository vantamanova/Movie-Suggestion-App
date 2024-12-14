import { renderListWithTemplate } from "./utils.mjs"
import ExternalServices from "./utils.mjs";

// Template for movie card
function movieCardTemplate(movie) {
    return `
    <div class="movie-card">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.original_title} poster">
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
            <button class="outline" data-id="${movie.id}" data-type="movie" data-imdbId="${movie.imdb_id}">View Details</button>
        </div>
    </div>`
}


// Template for series card
function seriesCardTemplate(movie) {
    return `
    <div class="movie-card">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.original_title} poster">
        <div class="movie-info">
            <h3>${movie.name}</h3>
            <p>${movie.overview}</p>
            <button class="outline" data-id="${movie.id}" data-type="series" data-imdbId="${movie.imbd_id}">View Details</button>
        </div>
    </div>`
}
// 
export default class MoviesList {
    constructor(selector, dataSourse, type) {
        this.selector = selector;
        this.dataSourse = dataSourse;
        this.type = type
    }

    async init() {
        const element = document.querySelector(this.selector);
    
        if (this.type === "movie") {
            renderListWithTemplate(movieCardTemplate, element, this.dataSourse);
        } else {
            renderListWithTemplate(seriesCardTemplate, element, this.dataSourse);
        }
    
        // Use event delegation
        element.addEventListener("click", (event) => {
            if (event.target.classList.contains("outline")) {
                const id = event.target.getAttribute("data-id");
                const type = event.target.getAttribute("data-type");
                const imdbId = event.target.getAttribute("data-imdbId");
                console.log(`Navigating to: moviepage.html?id=${id}&type=${type}`);
                window.location.href = `moviepage.html?id=${id}&type=${type}&imdbId=${imdbId}`;
            }
        });
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


