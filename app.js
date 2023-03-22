var body = document.querySelector("body");
const search = document.getElementById("search-input");
var hamburger = document.querySelector(".hamburger");
let genres = [];

hamburger.addEventListener("click", function () {
  body.classList.toggle("toggle");
});

let localWindow = window.matchMedia("(min-width: 600px)");

localWindow.addEventListener("change", () => {
  body.classList.toggle("toggle");
});

addEventListener("load", () => {
  if (window.screen.width <= 500) body.classList.toggle("toggle");
});

search.addEventListener("input", searchValue);

function leftScroll() {
  const left = document.activeElement.nextElementSibling;
  left.scrollBy(-730, 0);
}
function rightScroll() {
  const right = document.activeElement.previousElementSibling;
  right.scrollBy(730, 0);
}

async function fetchData(baseurl) {
  const arr = await fetch(baseurl)
    .then((res) => res.json())
    .then((data) => data)
    .catch(console.error);
  return arr;
}

async function searchValue(e) {
  const value = e.target.value;
  const heroSections = document.getElementById("filter-section");

  if (value.length <= 3) return;

  heroSections.innerHTML = "";

  const categoryTitle = document.createElement("h1");
  categoryTitle.textContent = "Filter";
  categoryTitle.classList.add("hero-section-category");
  heroSections.appendChild(categoryTitle);

  const sectionInner = document.createElement("div");
  sectionInner.classList.add("hero-sction-inner");

  const leftButton = document.createElement("button");
  leftButton.classList.add("left");
  leftButton.setAttribute("id", "leftbtn1");
  leftButton.addEventListener("click", leftScroll);

  sectionInner.appendChild(leftButton);

  const newData = await fetchData(
    `https://api.themoviedb.org/3/search/movie?api_key=e5142e8773e78c96e4e7ae66cab816fc&language=en-US&query=${value}&page=1&include_adult=true`
  );
  console.log(newData);

  let heroSection = document.createElement("div");
  heroSection.classList.add("hero-sction");

  for (let index = 0; index < newData.results.length; index++) {
    const heroCard = document.createElement("div");
    heroCard.classList.add("hero-card");

    const img = document.createElement("img");
    img.setAttribute(
      "src",
      newData.results[index].poster_path
        ? `http://image.tmdb.org/t/p/w500/${newData.results[index].poster_path}`
        : "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
    );
    img.classList.add("slide-image-inner");

    heroCard.appendChild(img);

    const span1 = document.createElement("span");
    span1.classList.add("card-title");
    span1.textContent = newData.results[index].original_title;

    heroCard.appendChild(span1);

    const titleHover = document.createElement("div");
    titleHover.classList.add("title-hover");
    titleHover.textContent = newData.results[index].original_title;

    heroCard.appendChild(titleHover);

    const span2 = document.createElement("span");
    span2.classList.add("card-rate");
    span2.textContent = newData.results[index].vote_average;

    heroCard.appendChild(span2);

    heroSection.appendChild(heroCard);
  }

  sectionInner.appendChild(heroSection);

  const rightButton = document.createElement("button");
  rightButton.addEventListener("click", rightScroll);
  rightButton.classList.add("right");

  sectionInner.appendChild(rightButton);

  heroSections.appendChild(sectionInner);
}

async function showCategory(genres) {
  const heroSections = document.getElementsByClassName("hero-sections")[1];
  heroSections.classList.add("hero-sections");

  for (let index = 0; index < genres.length; index++) {
    const categoryTitle = document.createElement("h1");
    categoryTitle.textContent = genres[index].name;
    categoryTitle.classList.add("hero-section-category");
    heroSections.appendChild(categoryTitle);

    const sectionInner = document.createElement("div");
    sectionInner.classList.add("hero-sction-inner");

    const leftButton = document.createElement("button");
    leftButton.classList.add("left");
    leftButton.setAttribute("id", "leftbtn1");
    leftButton.addEventListener("click", leftScroll);

    sectionInner.appendChild(leftButton);

    const newData = await fetchData(
      `https://api.themoviedb.org/3/discover/movie?api_key=e5142e8773e78c96e4e7ae66cab816fc&with_genres=${genres[index].id}`
    );

    let heroSection = document.createElement("div");
    heroSection.classList.add("hero-sction");

    for (let index = 0; index < newData.results.length; index++) {
      const heroCard = document.createElement("div");
      heroCard.classList.add("hero-card");

      const img = document.createElement("img");
      img.setAttribute(
        "src",
        newData.results[index].poster_path
          ? `http://image.tmdb.org/t/p/w500/${newData.results[index].poster_path}`
          : "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
      );
      img.classList.add("slide-image-inner");

      heroCard.appendChild(img);

      const span1 = document.createElement("span");
      span1.classList.add("card-title");
      span1.textContent = newData.results[index].original_title;

      heroCard.appendChild(span1);

      const titleHover = document.createElement("div");
      titleHover.classList.add("title-hover");
      titleHover.textContent = newData.results[index].original_title;

      heroCard.appendChild(titleHover);

      const span2 = document.createElement("span");
      span2.classList.add("card-rate");
      span2.textContent = newData.results[index].vote_average;

      heroCard.appendChild(span2);

      heroSection.appendChild(heroCard);
    }

    sectionInner.appendChild(heroSection);

    const rightButton = document.createElement("button");
    rightButton.addEventListener("click", rightScroll);
    rightButton.classList.add("right");

    sectionInner.appendChild(rightButton);

    heroSections.appendChild(sectionInner);
  }
}

async function showGenres() {
  const genrue = await fetchData(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=e5142e8773e78c96e4e7ae66cab816fc&language=en-US`
  );
  const ul = document.getElementById("sidebar-categories");
  genres = genrue.genres;
  genres.forEach((element) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const span = document.createElement("span");
    span.textContent = element.name;
    span.classList.add("item");
    a.appendChild(span);
    li.appendChild(a);
    ul.appendChild(li);
  });
  showCategory(genres);
}

async function showTrending() {
  const trendsMovies = await fetchData(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=e5142e8773e78c96e4e7ae66cab816fc`
  );
  console.log(trendsMovies.results);
  const divs = document.getElementsByClassName("slide-image");

  const divDetals = document.getElementsByClassName("carousel-detalis");

  for (let index = 0; index < 3; index++) {
    const number = Math.floor(
      Math.random() * (trendsMovies.results.length - 4) + index
    );

    const img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/w500/${trendsMovies.results[number].poster_path}`;
    img.classList.add("slide-image-inner");
    divs[index].appendChild(img);

    const h1 = document.createElement("h1");
    h1.classList.add("carousel-title");
    h1.textContent = trendsMovies.results[number].title;
    divDetals[index].appendChild(h1);

    const p1 = document.createElement("p");
    p1.classList.add("carousel-description");
    p1.textContent = trendsMovies.results[number].overview;
    divDetals[index].appendChild(p1);
    divs[index].appendChild(divDetals[index]);
  }
}
function display() {
  showGenres();
  showTrending();
}

display();
