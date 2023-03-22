addEventListener("load", () => {
  if (localStorage.getItem("id") == null) {
    window.location.href = "http://127.0.0.1:5501/index.html";
  }
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
    if (movie.id == localStorage.getItem("id")) {
      let htmlSegment = `<div class="movie">
      <div class="imgBox">
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}"/>
      </div>
      <div class="txtBox">
      <h2>${movie.title}, ${movie.release_date}</h2>
      <div class="ratingBox">
      <div class="averageRating">
      <p class="lightTxt">TMDb RATING</p>
      <div class="flex">
      <div><span class="rateStar">★</span></div>
      <div><h3>${movie.vote_average}<span> / 10</span></h3>
      <p class="lightTxt">${movie.vote_count}</p></div>
      </div>
      </div>
      <div class="userRating">
      <p class="lightTxt">YOUR RATING</p>
      <div class="ratings-wrapper">
      <div data-productid="${movie.id}" class="ratings">
         <span class="span" data-rating="5">★</span>
         <span class="span" data-rating="4">★</span>
         <span class="span" data-rating="3">★</span>
         <span class="span" data-rating="2">★</span>
         <span class="span" data-rating="1">★</span>
      </div>
   </div>
      </div>
      
      </div>
      <p>${movie.overview}</p>
      </div>
  </div>`;

      html += htmlSegment;
    }
  });

  let container = document.querySelector(".container");
  container.innerHTML = html;
  let stars = document.getElementsByClassName("span");
  let products = document.querySelectorAll(".ratings");
  let ratings = [];
  for (let star of stars) {
    star.addEventListener("click", function () {
      let children = star.parentElement.children;
      for (let child of children) {
        if (child.getAttribute("data-clicked")) {
          return false;
        }
      }

      this.setAttribute("data-clicked", "true");
      let rating = this.dataset.rating;
      let productId = this.parentElement.dataset.productid;
      let data = {
        rating: rating,
        "product-id": productId,
      };
      ratings.push(data);
      localStorage.setItem("rating", JSON.stringify(ratings));
    });
  }

  if (localStorage.getItem("rating")) {
    ratings = JSON.parse(localStorage.getItem("rating"));
    for (let rating of ratings) {
      for (let product of products) {
        if (product.dataset.productid == rating["product-id"]) {
          let reverse = Array.from(product.children).reverse();
          let index = parseInt(rating["rating"]) - 1;
          reverse[index].setAttribute("data-clicked", "true");
        }
      }
    }
  }
}

renderMovie();
