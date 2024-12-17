const baseURL = "https://api.themoviedb.org/3";

function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Bad Response");
    }
}

export default class ExternalServices {
  constructor() {}

  async getData(params) {
    try {
      const options = this.getRequestOptions();
      const data = await this.fetchData(`${baseURL}${params}`, options);

      if (data.results) {
        data.results = await this.enrichResults(data.results, options);
      }

      return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
  }

  // Get request options
  getRequestOptions() {
    return {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjAyZWM2ZTkwZmJlYWNiZGRiMTMwYzk5YTMwN2FlMSIsIm5iZiI6MTczMzMwOTQ5MS4wMjQ5OTk5LCJzdWIiOiI2NzUwMzQzM2NiMWUxMjBjY2I1ZGQyNTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FD0MMfK7J-9D3S3T5wcpcYs4YJ8YYQrONAo2CxPjJ_w",
      },
    };
  }

  // Fetch data from the API
  async fetchData(url, options) {
    const response = await fetch(url, options);
    return convertToJson(response);
  }

  // Adds missing imdb_id
  async enrichResults(results, options) {
    return Promise.all(
      results.map(async (item) => {
        if (!item.imdb_id) {
          const type = item.title ? "movie" : "tv";
          const endpoint = type === "movie" ? `${baseURL}/movie/${item.id}` : `${baseURL}/tv/${item.id}/external_ids`;
          const details = await this.fetchData(endpoint, options);
          return {
            ...item,
            imdb_id: type === "movie" ? details.imdb_id : details.imdb_id || null,
          };
        }
        return item;
      })
    );
  }
}

// Loads Header and Footer
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("partials/header.html");
  const footerTemplate = await loadTemplate("partials/footer.html");

  renderWithTemplate(headerTemplate, document.getElementById("header"));
  renderWithTemplate(footerTemplate, document.getElementById("footer"));
}

// Renders one element Using Template
export function renderWithTemplate(template, parentElement) {
  parentElement.insertAdjacentHTML("afterbegin", template);
}

// Loads the template from partials (maybe I need to use it for other templates as well)
async function loadTemplate(path) {
  const response = await fetch(path);
  return response.text();
}

// Renders list of elements
export async function renderListWithTemplate(template, parentElement, list, position = "afterbegin") {
  const html = list.map(template).join("");
  parentElement.insertAdjacentHTML(position, html);
}

// Adds movie to favourite using local Storage
export function addToFavorites(movie) {
  // Get existing favorites from Local Storage
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Check if the movie is already in the favorites
  const isAlreadyFavorite = favorites.some(fav => fav.id === movie.id);
  // Replace alert with showToast
  if (!isAlreadyFavorite) {
    favorites.push(movie);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    showToast("Movie added to favorites!");
  } else {
    showToast("This movie is already in your favorites!");
  }
}

export function showToast(message) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
      toast.remove();
  }, 3000);
}


