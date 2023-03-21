const apiKey = 'e5142e8773e78c96e4e7ae66cab816fc';
const genre = 'comedy';
const container = document.querySelector('header');

fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}`)

  .then(response => response.json())
  .then(data => {
    data.results.forEach(movie => {
      const card = document.createElement('div');
      card.classList.add('bx');

      const image = document.createElement('img');
      image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      image.alt = movie.title;

      const content = document.createElement('div');
      content.classList.add('content');

      const title = document.createElement('div');
      title.textContent = movie.title;

      

      card.append(image, title);
      container.appendChild(card);
    });
  })
  .catch(error => console.error(error));