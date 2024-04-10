function searchMovie() {
  const apiKey = '5bad1b58';
  const searchInput = document.getElementById('searchInput').value;
  const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchInput}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        displayMovieDetails(data);
        if (data.Poster !== 'N/A') {
          backgrounds.length = 0; // Clear existing backgrounds
          backgrounds.push(data.Poster);
          if (data.Images && data.Images.length > 0) {
            backgrounds.push(...data.Images);
          }
          clearInterval(backgroundInterval); // Stop previous background transition
          currentBackgroundIndex = 0; // Reset background index
          crossfadeBackground(); // Change background to movie poster
          backgroundInterval = setInterval(crossfadeBackground, 5000); // Start background transition
        }
      } else {
        document.getElementById('movieDetails').innerHTML = 'Movie not found.';
      }
    })
    .catch(error => console.log('Error:', error));
}

function displayMovieDetails(movie) {
  const movieDetails = `
    <h2>${movie.Title}</h2>
    <p><strong>Year:</strong> ${movie.Year}</p>
    <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
    <p><strong>Plot:</strong> ${movie.Plot}</p>
    <img src="${movie.Poster}" alt="${movie.Title} poster">
  `;
  document.getElementById('movieDetails').innerHTML = movieDetails;
}

let backgroundInterval = null; // Variable to hold the interval for background transition
