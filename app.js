var body = document.querySelector("body");
var hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function () {
  body.classList.toggle("toggle");
});

var localWindow = window.matchMedia("(min-width: 700px)");
localWindow.addEventListener("change", () => {
  body.classList.toggle("toggle");
});

//  Render one movie based on its own ID, the ID will be a variable taken from user input
async function getMovies() {
  let url =
    "https://api.themoviedb.org/3/discover/movie?api_key=e5142e8773e78c96e4e7ae66cab816fc";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
async function renderMovie() {
  let movies = await getMovies();
  let html = "";
  movies.results.forEach((movie) => {
    if (movie.id == 315162) {
      let htmlSegment = `<div class="movie">
      <div class="imgBox">
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}"/>
      </div>
      <div class="txtBox">
      <h2>${movie.title}, ${movie.release_date}</h2>
      <h3>${movie.vote_average} / 10 </br> <span>${movie.vote_count}</span>
      </h3>

      <p>${movie.overview}</p>
      </div>
  </div>`;

      html += htmlSegment;
    }
  });

  let container = document.querySelector(".container");
  container.innerHTML = html;
}

renderMovie();
