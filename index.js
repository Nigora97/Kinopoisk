// // Элементы
// const body = document.querySelector("body");
// const search = document.getElementById("search");
// const main = document.querySelector(".main");
// const movieTitle = document.querySelectorAll(".movieTitle");
// const movie = document.querySelector(".movie");
// const movieImg = document.querySelector(".movieImg");
// const movieDesk = document.querySelector(".movieDescription");
// const similarMovies = document.querySelector(".similarMovies");
// const similarCard = document.querySelectorAll(".similarCard");
// // Кнопки
// const themeBtn = document.querySelector("#themeChange");
// const searchBtn = document.querySelector("#searchBtn");
// // слушатели событий
// if(themeBtn){
// themeBtn.addEventListener("click", themeChange);
// }
// if(searchBtn){
// searchBtn.addEventListener("click", findMovie);
// }
// window.addEventListener("keydown", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     findMovie();
//   }
// });

// function themeChange() {
//   body.classList.toggle("dark");
// }

// async function findMovie() {
//   const loader = document.querySelector(".loader");
//   loader.style.display = "block";
//   const data = { apikey: "fcced9b6", t: search.value };
//   const response = await sendRequest("https://www.omdbapi.com", "GET", data);
//   loader.style.display = "none";
//   if (response.Response === "False") {
//     main.style.display = "block";
//     movie.style.display = "none";
//     movieTitle[0].style.display = "block";
//     movieTitle[0].innerHTML = "Файл не найден";
//   } else {
//     showMovie(response);
//     findSimilarMovies();
//   }
// }

// function showMovie(data) {
//   main.style.display = "block";
//   movieTitle[0].style.display = "block";
//   movie.style.display = "flex";
//   movieImg.style.backgroundImage = `url(${data.Poster})`;
//   movieTitle[0].innerHTML = data.Title;

//   let params = [
//     "imdbRating",
//     "Year",
//     "Released",
//     "Genre",
//     "Country",
//     "Language",
//     "Director",
//     "Writer",
//     "Actors",
//   ];
//   movieDesk.innerHTML = "";
//   params.map((elem) => {
//     movieDesk.innerHTML += `
//             <div class="desk">
//                 <p>${elem}</p>
//                 <p>${data[elem]}</p>
//             </div>
//               `;
//   });
// }

// async function findSimilarMovies() {
//   const data = { apikey: "fcced9b6", s: search.value };
//   const response = await sendRequest("https://www.omdbapi.com", "GET", data);
//   movieTitle[1].style.display = "block";
//   movieTitle[1].innerHTML = `Найдено похожих фильмов: ${response.Search.length}`;
//   showSimilarMovies(response.Search);
// }
// function showSimilarMovies(movies) {
//   const similarMovies = document.querySelector(".similarMovies");
//   similarMovies.style.display = "grid";
//   similarMovies.innerHTML = "";
//   for (let i = 0; i < movies.length; i++) {
//     let movie = movies[i];
//     if (movie.Poster != "N/A") {
//       let similarMovie = `
//    <div class="similarCard" style="background-Image: url(${movie.Poster})" >
//             <div class="similar" onClick="addSaved(event)"
//             data-poster=${movie.Poster}  
//             data-title=${movie.Poster} 
//             data-imdbID=${movie.imdbID}></div>
//             <p>${movie.Title}</p>
//         </div>`;

//       similarMovies.innerHTML += similarMovie;
//     }
//   }
// }

// function addSaved(event){
//   const target = event.currentTarget
//   const movieDate = {
//     title:target.getAttribute("data-title"),
//     poster:target.getAttribute("data-poster"),
//     imdbID:target.getAttribute("data-imdbID"),
//   };

//   let favs = JSON.parse(localStorage.getItem("favs")) || []
//   let movieIndex = favs.findIndex((movie)=> movie.imdbID===movieDate.imdbID)
//   if(movieIndex > -1){
//     favs.splice(movieIndex, 1);
//     target.classList.remove("star")
//   }else{
//     favs.push(movieDate)
//     target.classList.add("star")
//   }

//   localStorage.setItem("favs", JSON.stringify(favs));
//   showFavorites()
//   }

//   function showFavorites(){
//     const movies = document.querySelector(".similarMovies")
//     const favs = JSON.parse(localStorage.getItem("favs")) || [];

//     movies.innerHTML = ""
    
//     for (let i = 0; i<favs.length; i++) {
//       let elem = favs[i]; // Достаем каждый фильм из списка
//       let movieCard = `
//      <div class="similarCard" style="background-Image: url(${elem.poster})" >
//               <div class="similar" onClick="addSaved(this)" 
//               data-poster=${elem.poster}  
//               data-title=${elem.title} 
//               data-imdbID=${elem.imdbID}></div>
//               <p>${elem.Title}</p>
//           </div>`;
//           movies.innerHTML += movieCard

  
//   }}

//   document.addEventListener("DOMContentLoaded", showFavorites);



// document.addEventListener("DOMContentLoaded", () => {
//   // Проверяем, что это страница избранного
//   if (document.body.classList.contains("favoritesPage")) {
//     showFavorites();  // Вызываем функцию для отображения избранных фильмов
//   }
// });

// // Функция для отображения избранных фильмов
// function showFavorites() {
//   const favoritesContainer = document.querySelector(".favoritesContainer");  // Находим контейнер для избранных
//   if (!favoritesContainer) {
//     console.log("Контейнер для избранного не найден");  // Логируем ошибку, если контейнер не найден
//     return;
//   }

//   // Получаем сохраненные фильмы из localStorage
//   const favs = JSON.parse(localStorage.getItem("favs")) || [];
//   console.log("Сохраненные фильмы:", favs);  // Логируем полученные фильмы

//   // Очищаем контейнер перед рендерингом
//   favoritesContainer.innerHTML = "";
  
//   // Если нет избранных фильмов, показываем сообщение
//   if (favs.length === 0) {
//     favoritesContainer.innerHTML = "<p>Нет избранных фильмов</p>";
//     console.log("Нет избранных фильмов");
//     return;
//   }

//   // Рендерим избранные фильмы
//   favs.forEach((elem) => {
//     let movieCard = `
//       <div class="similarCard" style="background-image: url(${elem.poster})">
//         <div class="similar star" onclick="addSaved(event)"
//         data-poster="${elem.poster}"  
//         data-title="${elem.title}" 
//         data-imdbID="${elem.imdbID}"></div>
//         <p>${elem.title}</p>
//       </div>`;
//     favoritesContainer.innerHTML += movieCard;  // Добавляем карточку фильма в контейнер
//   });

//   console.log("Фильмы отображены");  // Логируем, что фильмы были добавлены
// }

// // Функция для добавления/удаления фильма из избранного
// function addSaved(event) {
//   const target = event.currentTarget;
//   const movieData = {
//     title: target.getAttribute("data-title"),
//     poster: target.getAttribute("data-poster"),
//     imdbID: target.getAttribute("data-imdbID"),
//   };

//   let favs = JSON.parse(localStorage.getItem("favs")) || [];
//   let movieIndex = favs.findIndex((movie) => movie.imdbID === movieData.imdbID);
  
//   if (movieIndex > -1) {
//     favs.splice(movieIndex, 1);  // Удаляем фильм, если он уже в избранном
//     target.classList.remove("star");  // Убираем класс "star"
//   } else {
//     favs.push(movieData);  // Добавляем фильм в избранное
//     target.classList.add("star");  // Добавляем класс "star"
//   }

//   // Сохраняем обновленный список в localStorage
//   localStorage.setItem("favs", JSON.stringify(favs));

//   // Проверяем, находимся ли мы на странице избранного
//   if (document.body.classList.contains("favoritesPage")) {
//     showFavorites();  // Обновляем избранное только на этой странице
//   }

//   console.log(favs);  // Логируем актуальное состояние избранных фильмов
// }









// // Элементы
// const body = document.querySelector("body");
// const search = document.getElementById("search");
// const main = document.querySelector(".main");
// const movieTitle = document.querySelectorAll(".movieTitle");
// const movie = document.querySelector(".movie");
// const movieImg = document.querySelector(".movieImg");
// const movieDesk = document.querySelector(".movieDescription");
// const similarMovies = document.querySelector(".similarMovies");

// // Кнопки
// const themeBtn = document.querySelector("#themeChange");
// const searchBtn = document.querySelector("#searchBtn");

// // Слушатели событий
// if (themeBtn) {
//   themeBtn.addEventListener("click", themeChange);
// }
// if (searchBtn) {
//   searchBtn.addEventListener("click", findMovie);
// }
// window.addEventListener("keydown", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     findMovie();
//   }
// });

// function themeChange() {
//   body.classList.toggle("dark");
// }

// async function findMovie() {
//   const loader = document.querySelector(".loader");
//   loader.style.display = "block";
//   const data = { apikey: "fcced9b6", t: search.value };
//   const response = await sendRequest("https://www.omdbapi.com", "GET", data);
//   loader.style.display = "none";
//   if (response.Response === "False") {
//     main.style.display = "block";
//     movie.style.display = "none";
//     movieTitle[0].style.display = "block";
//     movieTitle[0].innerHTML = "Фильм не найден";
//   } else {
//     showMovie(response);
//     findSimilarMovies();
//   }
// }

// function showMovie(data) {
//   main.style.display = "block";
//   movieTitle[0].style.display = "block";
//   movie.style.display = "flex";
//   movieImg.style.backgroundImage = `url(${data.Poster})`;
//   movieTitle[0].innerHTML = data.Title;
  
//   let params = ["imdbRating", "Year", "Released", "Genre", "Country", "Language", "Director", "Writer", "Actors"];
//   movieDesk.innerHTML = "";
//   params.forEach((elem) => {
//     movieDesk.innerHTML += `
//       <div class="desk">
//         <p>${elem}</p>
//         <p>${data[elem]}</p>
//       </div>`;
//   });
// }

// async function findSimilarMovies() {
//   const data = { apikey: "fcced9b6", s: search.value };
//   const response = await sendRequest("https://www.omdbapi.com", "GET", data);
//   if (!response.Search) return;
//   movieTitle[1].style.display = "block";
//   movieTitle[1].innerHTML = `Найдено похожих фильмов: ${response.Search.length}`;
//   showSimilarMovies(response.Search);
// }

// function showSimilarMovies(movies) {
//   similarMovies.style.display = "grid";
//   similarMovies.innerHTML = "";
//   movies.forEach((movie) => {
//     if (movie.Poster !== "N/A") {
//       let similarMovie = `
//         <div class="similarCard" style="background-image: url(${movie.Poster})">
//           <div class="similar" onClick="addSaved(event)"
//           data-poster="${movie.Poster}"  
//           data-title="${movie.Title}" 
//           data-imdbID="${movie.imdbID}"></div>
//           <p>${movie.Title}</p>
//         </div>`;
//       similarMovies.innerHTML += similarMovie;
//     }
//   });
// }

// document.addEventListener("DOMContentLoaded", () => {
//   console.log("DOM полностью загружен и разобран.");
//   if (document.body.classList.contains("favoritesPage")) {
//     showFavorites();  // Вызываем функцию для отображения избранных фильмов
//   }
// });

// // Функция для отображения избранных фильмов
// async function showFavorites() {
//   const favoritesContainer = document.querySelector(".favoritesContainer");  // Находим контейнер для избранных
//   if (!favoritesContainer) {
//     console.log("Контейнер для избранного не найден");  // Логируем ошибку, если контейнер не найден
//     return;
//   }

//   // Получаем сохраненные фильмы из localStorage
//   const favs = JSON.parse(localStorage.getItem("favs")) || [];
//   console.log("Сохраненные фильмы:", favs);  // Логируем полученные фильмы

//   // Очищаем контейнер перед рендерингом
//   favoritesContainer.innerHTML = "";
  
//   // Если нет избранных фильмов, показываем сообщение
//   if (favs.length === 0) {
//     favoritesContainer.innerHTML = "<p>Нет избранных фильмов</p>";
//     console.log("Нет избранных фильмов");
//     return;
//   }

//   // Рендерим избранные фильмы
//   favs.forEach((elem) => {
//     let movieCard = `
//       <div class="similarCard" style="background-image: url(${elem.poster})">
//         <div class="similar star" onclick="addSaved(event)"
//         data-poster="${elem.poster}"  
//         data-title="${elem.title}" 
//         data-imdbID="${elem.imdbID}"></div>
//         <p>${elem.title}</p>
//       </div>`;
//     favoritesContainer.innerHTML += movieCard;  // Добавляем карточку фильма в контейнер
//   });

//   console.log("Фильмы отображены");  // Логируем, что фильмы были добавлены
// }

// // Функция для добавления/удаления фильма из избранного
// function addSaved(event) {
//   const target = event.currentTarget;
//   const movieData = {
//     title: target.getAttribute("data-title"),
//     poster: target.getAttribute("data-poster"),
//     imdbID: target.getAttribute("data-imdbID"),
//   };

//   let favs = JSON.parse(localStorage.getItem("favs")) || [];
//   let movieIndex = favs.findIndex((movie) => movie.imdbID === movieData.imdbID);
  
//   if (movieIndex > -1) {
//     console.log(`Удаление из избранного: ${movieData.title}`);
//     favs.splice(movieIndex, 1);  // Удаляем фильм, если он уже в избранном
//     target.classList.remove("star");  // Убираем класс "star"
//   } else {
//     console.log(`Добавление в избранное: ${movieData.title}`);
//     favs.push(movieData);  // Добавляем фильм в избранное
//     target.classList.add("star");  // Добавляем класс "star"
//   }

//   // Сохраняем обновленный список в localStorage
//   localStorage.setItem("favs", JSON.stringify(favs));

//   // Проверяем, находимся ли мы на странице избранного
//   if (document.body.classList.contains("favoritesPage")) {
//     showFavorites();  // Обновляем избранное только на этой странице
//   }

//   console.log("Текущий список избранных:", favs);  // Логируем актуальное состояние избранных фильмов
// }

// async function sendRequest(url, method, data) {
//   if (method == "POST") {
//     let response = await fetch(url, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     response = await response.json();
//     return response;
//   } else if (method == "GET") {
//     url = url + "?" + new URLSearchParams(data);
//     let response = await fetch(url, {
//       method: "GET",
//     });
//     response = await response.json();
//     return response;
//   }
// }






// Элементы
const body = document.querySelector("body");
const search = document.getElementById("search");
const main = document.querySelector(".main");
const movieTitle = document.querySelectorAll(".movieTitle");
const movie = document.querySelector(".movie");
const movieImg = document.querySelector(".movieImg");
const movieDesk = document.querySelector(".movieDescription");
const similarMovies = document.querySelector(".similarMovies");

// Кнопки
const themeBtn = document.querySelector("#themeChange");
const searchBtn = document.querySelector("#searchBtn");

// Слушатели событий
if (themeBtn) {
  themeBtn.addEventListener("click", themeChange);
}
if (searchBtn) {
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
  if (response.Response === "False") {
    main.style.display = "block";
    movie.style.display = "none";
    movieTitle[0].style.display = "block";
    movieTitle[0].innerHTML = "Фильм не найден";
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
  
  let params = ["imdbRating", "Year", "Released", "Genre", "Country", "Language", "Director", "Writer", "Actors"];
  movieDesk.innerHTML = "";
  params.forEach((elem) => {
    movieDesk.innerHTML += `
      <div class="desk">
        <p>${elem}</p>
        <p>${data[elem]}</p>
      </div>`;
  });
}

async function findSimilarMovies() {
  const data = { apikey: "fcced9b6", s: search.value };
  const response = await sendRequest("https://www.omdbapi.com", "GET", data);
  if (!response.Search) return;
  movieTitle[1].style.display = "block";
  movieTitle[1].innerHTML = `Найдено похожих фильмов: ${response.Search.length}`;
  showSimilarMovies(response.Search);
}

function showSimilarMovies(movies) {
  similarMovies.style.display = "grid";
  similarMovies.innerHTML = "";
  movies.forEach((movie) => {
    if (movie.Poster !== "N/A") {
      let similarMovie = `
        <div class="similarCard" style="background-image: url(${movie.Poster})">
          <div class="similar" onclick="addSaved(event)"
          data-poster="${movie.Poster}"  
          data-title="${movie.Title}" 
          data-imdbID="${movie.imdbID}"></div>
          <p>${movie.Title}</p>
        </div>`;
      similarMovies.innerHTML += similarMovie;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM полностью загружен и разобран.");
  if (document.body.classList.contains("favoritesPage")) {
    console.log("Это страница избранного. Загружаем избранные фильмы.");
    showFavorites();  // Вызываем функцию для отображения избранных фильмов
  }
});

// Функция для отображения избранных фильмов
async function showFavorites() {
  const favoritesContainer = document.querySelector(".favoritesContainer");  // Находим контейнер для избранных
  if (!favoritesContainer) {
    console.log("Контейнер для избранного не найден");  // Логируем ошибку, если контейнер не найден
    return;
  }

  // Получаем сохраненные фильмы из localStorage
  const favs = JSON.parse(localStorage.getItem("favs")) || [];
  console.log("Сохраненные фильмы:", favs);  // Логируем полученные фильмы

  // Очищаем контейнер перед рендерингом
  favoritesContainer.innerHTML = "";
  
  // Если нет избранных фильмов, показываем сообщение
  if (favs.length === 0) {
    favoritesContainer.innerHTML = "<p>Нет избранных фильмов</p>";
    console.log("Нет избранных фильмов");
    return;
  }

  // Рендерим избранные фильмы
  favs.forEach((elem) => {
    console.log("Отображаем фильм:", elem.title);
    let movieCard = `
      <div class="similarCard" style="background-image: url(${elem.poster})">
        <div class="similar star" onclick="addSaved(event)"
        data-poster="${elem.poster}"  
        data-title="${elem.title}" 
        data-imdbID="${elem.imdbID}"></div>
        <p>${elem.title}</p>
      </div>`;
    favoritesContainer.innerHTML += movieCard;  // Добавляем карточку фильма в контейнер
  });

  console.log("Фильмы отображены в контейнере:", favoritesContainer.innerHTML);  // Логируем, что фильмы были добавлены
}

// Функция для добавления/удаления фильма из избранного
function addSaved(event) {
  const target = event.currentTarget;
  const movieData = {
    title: target.getAttribute("data-title"),
    poster: target.getAttribute("data-poster"),
    imdbID: target.getAttribute("data-imdbID"),
  };

  let favs = JSON.parse(localStorage.getItem("favs")) || [];
  let movieIndex = favs.findIndex((movie) => movie.imdbID === movieData.imdbID);
  
  if (movieIndex > -1) {
    console.log(`Удаление из избранного: ${movieData.title}`);
    favs.splice(movieIndex, 1);  // Удаляем фильм, если он уже в избранном
    target.classList.remove("star");  // Убираем класс "star"
  } else {
    console.log(`Добавление в избранное: ${movieData.title}`);
    favs.push(movieData);  // Добавляем фильм в избранное
    target.classList.add("star");  // Добавляем класс "star"
  }

  // Сохраняем обновленный список в localStorage
  localStorage.setItem("favs", JSON.stringify(favs));
  console.log("Данные в localStorage после обновления:", JSON.parse(localStorage.getItem("favs")));

  // Проверяем, находимся ли мы на странице избранного
  if (document.body.classList.contains("favoritesPage")) {
    console.log("Обновляем избранное на странице избранного.");
    showFavorites();  // Обновляем избранное только на этой странице
  }

  console.log("Текущий список избранных:", favs);  // Логируем актуальное состояние избранных фильмов
}

// Функция для отправки запросов на сервер
async function sendRequest(url, method, data) {
  if (method === "POST") {
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
  } else if (method === "GET") {
    url = url + "?" + new URLSearchParams(data);
    let response = await fetch(url, {
      method: "GET",
    });
    response = await response.json();
    return response;
  }
}
