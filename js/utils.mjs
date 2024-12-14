const baseURL = "https://api.themoviedb.org/3"

function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }

export default class ExternalServices {
  constructor() {
  }

  // Used to get data from the server
  async getData(params) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjAyZWM2ZTkwZmJlYWNiZGRiMTMwYzk5YTMwN2FlMSIsIm5iZiI6MTczMzMwOTQ5MS4wMjQ5OTk5LCJzdWIiOiI2NzUwMzQzM2NiMWUxMjBjY2I1ZGQyNTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FD0MMfK7J-9D3S3T5wcpcYs4YJ8YYQrONAo2CxPjJ_w'
        }
    };

    try {
        // Fetch the main data
        const response = await fetch(`${baseURL}${params}`, options);
        const data = await convertToJson(response);

        // If imdb_id is missing, enrich results for both movies and series
        if (data.results) {
            const enrichedResults = await Promise.all(
                data.results.map(async (item) => {
                    if (!item.imdb_id) {
                        // Determine if the item is a movie or a series
                        const type = item.title ? "movie" : "tv"; // Movies have 'title', series have 'name'

                        // Fetch details from the appropriate endpoint
                        const detailsResponse = await fetch(`${baseURL}/${type}/${item.id}`, options);
                        const details = await convertToJson(detailsResponse);

                        return {
                            ...item,
                            imdb_id: details.imdb_id // Add imdb_id to the item
                        };
                    }
                    return item; // If imdb_id exists, return the item as-is
                })
            );
            return { ...data, results: enrichedResults }; // Return enriched results
        }

        return data; // Return the original data if no results field is found
    } catch (error) {
        console.log("Error fetching data:", error);
        throw error;
    }
}
}


 // Loads header and footer
export async function loadHeaderFooter() {
    //Load the header and footer templates in from our partials
    const headerTemplate = await loadTemplate("partials/header.html");
    const footerTemplate = await loadTemplate("partials/footer.html");
  
    // Grab the header and footer elements out of the DOM.
    const headerElement = document.getElementById("header");
    const footerElement = document.getElementById("footer");
  
    // Render the header and footer
    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
  }

 // Renders template 
export function renderWithTemplate(template, parentElement) {
    parentElement.insertAdjacentHTML("afterbegin", template);
  }

// Loads template
async function loadTemplate(path) {
    const responce = await fetch(path);
    const template = await responce.text();
    return template;
  }

//
export async function renderListWithTemplate(template, parentElement, list, position="afterbegin") { 
  const html = await list.map(template);
  //await list.map(element => console.log(template(element)));
  parentElement.insertAdjacentHTML(position, html.join(""));
}
