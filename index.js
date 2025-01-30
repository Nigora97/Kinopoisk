// Элементы
const body = document.querySelector("body");
const search = document.getElementById("search");
const main = document.querySelector(".main");
const movieTitle = document.querySelectorAll(".movieTitle");
const movie = document.querySelector(".movie");
const movieImg = document.querySelector(".movieImg");
const movieDesk = document.querySelector(".movieDescription");
const similarMovies = document.querySelector(".similarMovies");
const similarCard = document.querySelectorAll(".similarCard");
// Кнопки
const themeBtn = document.querySelector("#themeChange");
const searchBtn = document.querySelector("#searchBtn");
// слушатели событий
if(themeBtn){
themeBtn.addEventListener("click", themeChange);
}
if(searchBtn){
searchBtn.addEventListener("click", findMovie);
}
window.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    findMovie();
  }
});

function themeChange() {
  body.classList.toggle("dark");
}

async function findMovie() {
  const loader = document.querySelector(".loader");
  loader.style.display = "block";
  const data = { apikey: "fcced9b6", t: search.value };
  const response = await sendRequest("https://www.omdbapi.com", "GET", data);
  loader.style.display = "none";
  console.log(response);
  if (response.Response === "False") {
    main.style.display = "block";
    movie.style.display = "none";
    movieTitle[0].style.display = "block";
    movieTitle[0].innerHTML = "Файл не найден";
  } else {
    showMovie(response);
    findSimilarMovies();
  }
}

function showMovie(data) {
  main.style.display = "block";
  movieTitle[0].style.display = "block";
  movie.style.display = "flex";
  movieImg.style.backgroundImage = `url(${data.Poster})`;
  movieTitle[0].innerHTML = data.Title;

  let params = [
    "imdbRating",
    "Year",
    "Released",
    "Genre",
    "Country",
    "Language",
    "Director",
    "Writer",
    "Actors",
  ];
  movieDesk.innerHTML = "";
  params.map((elem) => {
    movieDesk.innerHTML += `
            <div class="desk">
                <p>${elem}</p>
                <p>${data[elem]}</p>
            </div>
              `;
  });
}

async function findSimilarMovies() {
  const data = { apikey: "fcced9b6", s: search.value };
  const response = await sendRequest("https://www.omdbapi.com", "GET", data);
  console.log(response);
  movieTitle[1].style.display = "block";
  movieTitle[1].innerHTML = `Найдено похожих фильмов: ${response.Search.length}`;
  showSimilarMovies(response.Search);
}
function showSimilarMovies(movies) {
  const similarMovies = document.querySelector(".similarMovies");
  similarMovies.style.display = "grid";
  similarMovies.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i];
    if (movie.Poster != "N/A") {
      let similarMovie = `
   <div class="similarCard" style="background-Image: url(${movie.Poster})" >
            <div class="similar" data-poster=${movie.Poster}  data-title=${movie.Poster}></div>
            <p>${movie.Title}</p>
        </div>`;

      similarMovies.innerHTML += similarMovie;
    }
  }
}

async function sendRequest(url, method, data) {
  if (method == "POST") {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    response = await response.json();
    return response;
  } else if (method == "GET") {
    url = url + "?" + new URLSearchParams(data);
    let response = await fetch(url, {
      method: "GET",
    });
    response = await response.json();
    return response;
  }
}
