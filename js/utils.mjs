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
    
    const responce = await fetch(`${baseURL}${params}`, options);
    const data = await convertToJson(responce);
    return data;
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
    parentElement.insertAdjacentHTML(position, html.join(""));
}
