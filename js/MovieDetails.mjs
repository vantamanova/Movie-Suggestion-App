import ExternalServices from "./utils.mjs";
import { getStreamingAvailability } from "./StreamingAvailability.mjs";


export function moviePageTemplate(movie) {
    return `
           <div class="movie-details-hero">
            <img id="movie-poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="movie-details-info">
                <h1 id="movie-title">${movie.title}</h1>
                <p id="movie-release-date">Release Date: <span>${movie.release_date}</span></p>
                <p id="movie-rating">Rating: <span>${movie.vote_average}/10</span></p>
                <p id="movie-genre">Genre: <span>${movie.genres.map(genre => genre.name).join(', ')}</span></p>
            </div>
        </div>

        <div class="movie-details-main">
            <section class="movie-synopsis">
                <h2>Synopsis</h2>
                <p id="movie-synopsis">${movie.overview}</p>
            </section>

            <section class="movie-actions">
                <button class="outline streaming-platforms">Streaming Platforms</button>
                <button class="outline">Add to Favorites</button>
            </section>

            <section class="streaming-info" id="streaming-info">
                <h2>Available On</h2>
                <p id="platforms-list">Click the button above to see streaming platforms.</p>
            </section>
        </div>`
}

export function seriesPageTemplate(tvShow) {
    return `
           <div class="movie-details-hero">
            <img id="movie-poster" src="https://image.tmdb.org/t/p/w500${tvShow.poster_path}" alt="${tvShow.name}">
            <div class="movie-details-info">
                <h1 id="movie-title">${tvShow.name}</h1>
                <p id="movie-release-date">Release Date: <span>${tvShow.first_air_date}</span></p>
                <p id="movie-rating">Rating: <span>${tvShow.vote_average}/10</span></p>
                <p id="movie-genre">Genre: <span>${tvShow.genres.map(genre => genre.name).join(', ')}</span></p>
            </div>
        </div>

        <div class="movie-details-main">
            <section class="movie-synopsis">
                <h2>Synopsis</h2>
                <p id="movie-synopsis">${tvShow.overview}</p>
            </section>

            <section class="movie-actions">
                <button class="outline streaming-platforms">Streaming Platforms</button>
                <button class="outline">Add to Favorites</button>
            </section>

            <section class="streaming-info" id="streaming-info">
                <h2>Available On</h2>
                <p id="platforms-list">Click the button above to see streaming platforms.</p>
            </section>
        </div>`
}

export default class MovieDetails{
    constructor(movieId, type, imdbId) {
        this.movieId = movieId;
        this.type = type
        this.imdbId = imdbId;
    }

    async init() {
        const moviesDataSourse = new ExternalServices();
        const params = this.type === "movie" ? `/movie/${this.movieId}` : `/tv/${this.movieId}`;
        console.log(params);
        const data = await moviesDataSourse.getData(params)
        console.log(data);

        const templateHtml = this.type === "movie" ? moviePageTemplate(data) : seriesPageTemplate(data);
        renderMovieDetails(templateHtml);

        const element = document.querySelector(".streaming-platforms");
        element.addEventListener("click", async() => {
            //await getStreamingPlatforms(this.movieId, this.type) 
            await getStreamingAvailability(this.imdbId, 'us')   
        })
        
    }
}

async function renderMovieDetails(template) {
    const element = document.querySelector(".movie-section")
    element.insertAdjacentHTML("afterBegin", template)
}