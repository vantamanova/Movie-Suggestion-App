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

export function renderWithTemplate(template, parentElement) {
    parentElement.insertAdjacentHTML("afterbegin", template);
  }

async function loadTemplate(path) {
    const responce = await fetch(path);
    const template = await responce.text();
    return template;
  }