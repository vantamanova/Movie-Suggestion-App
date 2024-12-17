import { attachSearchHandler, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./utils.mjs";

loadHeaderFooter(() => {
    attachSearchHandler("search-button", "search-input", "search.html");
});

// Parse the search query from the URL
const params = new URLSearchParams(window.location.search);
const query = params.get("query");

const resultsContainer = document.getElementById("results-container");

if (query) {
    fetchSearchResults(query);
} else {
    resultsContainer.innerHTML = "<p>No search term provided.</p>";
}

// Fetch both movies and series based on the query
async function fetchSearchResults(query) {
    const externalServices = new ExternalServices();

    // Prepare API endpoints for movies and TV series
    const movieSearchParams = `/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`;
    const seriesSearchParams = `/search/tv?query=${encodeURIComponent(query)}&language=en-US&page=1`;

    try {
        // Fetch movies and series concurrently
        const [movieData, seriesData] = await Promise.all([
            externalServices.getData(movieSearchParams),
            externalServices.getData(seriesSearchParams),
        ]);

        // Merge movie and series results
        const combinedResults = [
            ...movieData.results.map((item) => ({ ...item, type: "movie" })),
            ...seriesData.results.map((item) => ({ ...item, type: "tv" })),
        ];

        if (combinedResults.length > 0) {
            renderResults(combinedResults);
        } else {
            resultsContainer.innerHTML = "<p>No movies or series found matching your search.</p>";
        }
    } catch (error) {
        console.error("Error fetching search results:", error);
        resultsContainer.innerHTML = "<p>Error fetching search results.</p>";
    }
}

// Render search results (movies and series)
function renderResults(results) {
    const html = results
        .map((item) => {
            const title = item.title || item.name; // Use "title" for movies, "name" for series
            const releaseDate = item.release_date || item.first_air_date || "N/A";
            return `
            <div class="movie-card">
                <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${title}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <p>Release Date: ${releaseDate}</p>
                    <button class="outline" 
                        data-id="${item.id}" 
                        data-type="${item.type}" 
                        data-imdbId="${item.imdb_id || ''}">
                        View Details
                    </button>
                </div>
            </div>`;
        })
        .join("");

    resultsContainer.innerHTML = html;

    // Add event listeners for buttons
    resultsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("outline")) {
            const id = event.target.getAttribute("data-id");
            const type = event.target.getAttribute("data-type");
            const imdbId = event.target.getAttribute("data-imdbId");

            // Redirect to movie or series page
            window.location.href = `moviepage.html?id=${id}&type=${type}&imdbId=${imdbId}`;
        }
    });
}
