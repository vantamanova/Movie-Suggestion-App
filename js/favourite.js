import { loadHeaderFooter, renderListWithTemplate, showToast, attachSearchHandler } from "./utils.mjs";

loadHeaderFooter(() => {
    attachSearchHandler("search-button", "search-input", "search.html");
});


function favoriteMovieTemplate(movie) {
    return `
    <div class="movie-card">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
        <div class="movie-info">
            <h3>${movie.title}</h3>
            <p>Rating: ${movie.vote_average}/10</p>
            <p>Release Date: ${movie.release_date}</p>
            <button class="remove-favorite" data-id="${movie.id}">Remove from Favorites</button>
        </div>
    </div>`;
}

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const mainElement = document.querySelector("main");

    if (favorites.length > 0) {
        const favoritesContainer = document.createElement("div");
        favoritesContainer.className = "favorites-container";
        renderListWithTemplate(favoriteMovieTemplate, favoritesContainer, favorites);
        mainElement.appendChild(favoritesContainer);

        // Add event listeners to "Remove from Favorites" buttons
        favoritesContainer.addEventListener("click", (event) => {
            if (event.target.classList.contains("remove-favorite")) {
                const movieId = event.target.getAttribute("data-id");
                removeFromFavorites(movieId);
                event.target.closest(".movie-card").remove();
            }
        });
    } else {
        mainElement.innerHTML += `<p class="no-favorites">You haven't added any favorites yet!</p>`;
    }
}

function removeFromFavorites(movieId) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = favorites.filter((movie) => movie.id !== parseInt(movieId));
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    showToast("Movie removed from favorites.");
}

// Initialize favorites display
loadFavorites();
