import ExternalServices from "./utils.mjs";


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
                <button class="outline">Watch Trailer</button>
                <button class="outline">Add to Favorites</button>
            </section>
        </div>`
}

export function seriesPageTemplate(tvShow) {
    return `
           <div class="movie-details-hero">
            <img id="movie-poster" src="path-to-movie-poster.jpg" alt="Movie Poster">
            <div class="movie-details-info">
                <h1 id="movie-title">Movie Title</h1>
                <p id="movie-release-date">Release Date: <span>2024-01-01</span></p>
                <p id="movie-rating">Rating: <span>8.5/10</span></p>
                <p id="movie-genre">Genre: <span>Action, Adventure</span></p>
            </div>
        </div>

        <div class="movie-details-main">
            <section class="movie-synopsis">
                <h2>Synopsis</h2>
                <p id="movie-synopsis">This is where the movie synopsis or description will go. It provides a brief
                    overview of the movie's plot, themes, and key elements.</p>
            </section>

            <section class="movie-actions">
                <button class="outline">Watch Trailer</button>
                <button class="outline">Add to Favorites</button>
            </section>
        </div>`
}

export default class MovieDetails{
    constructor(movieId, type) {
        this.movieId = movieId;
        this.type = type
    }

    async init() {
        const moviesDataSourse = new ExternalServices();
        const params = this.type === "movie" ? `/movie/${this.movieId}` : `/tv/${this.movieId}`;
        console.log(params);
        const data = await moviesDataSourse.getData(params)
        console.log(data);
        const templateHtml = moviePageTemplate(data)
        renderMovieDetails(templateHtml);

    }
}

async function renderMovieDetails(template) {
    const element = document.querySelector(".movie-section")
    element.insertAdjacentHTML("afterBegin", template)
}