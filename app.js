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
  let url = "movies.json";
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
  movies.forEach((movie) => {
    if (movie.ID == 1) {
      let htmlSegment = `<div class="movie">
      <div class="imgBox">
      <img src="${movie.Poster}"/>
      </div>
      <div class="textBox">
      <h2>${movie.Title}, ${movie.Year}</h2>
      <h3>${movie.imdbRating}</h3>
      </div>
  </div>`;

      html += htmlSegment;
    }
  });

  let container = document.querySelector(".container");
  container.innerHTML = html;
}

renderMovie();
