const apiKey = 'e5142e8773e78c96e4e7ae66cab816fc';
const genre = '80';
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const moviesContainer = document.querySelector('header');

        data.results.forEach(movie => {
          const movieCard = `
           

            <div class="bx">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div class="content">
                        <h3>${movie.title}</h3>
                        
                        <h6><span>IMDB</span><i class="bi bi-star-fill"></i>${movie.vote_average}</h6>
                    </div>
                </div>
          `;
          moviesContainer.insertAdjacentHTML('beforeend', movieCard);
        });
      })
      .catch(error => console.error(error));