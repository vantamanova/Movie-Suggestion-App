import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();


const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjAyZWM2ZTkwZmJlYWNiZGRiMTMwYzk5YTMwN2FlMSIsIm5iZiI6MTczMzMwOTQ5MS4wMjQ5OTk5LCJzdWIiOiI2NzUwMzQzM2NiMWUxMjBjY2I1ZGQyNTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FD0MMfK7J-9D3S3T5wcpcYs4YJ8YYQrONAo2CxPjJ_w'
    }
  };
  
  fetch('https://api.themoviedb.org/3/search/person?query=Tom&include_adult=false&language=en-US&page=1', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));


