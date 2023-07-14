export function sortMovies(movieCards, sortParam) {
  // Map the movieCards to an array of movie data
  const movies = movieCards.map((card) => JSON.parse(card.dataset.movie));

  // Now sort the movie data
  movies.sort((a, b) => {
    if (sortParam === "release_date") {
      // For release_date, convert the strings to Date objects and compare
      const dateA = new Date(a[sortParam]);
      const dateB = new Date(b[sortParam]);
      return dateB - dateA;
    } else if (sortParam === "vote_average" || sortParam === "popularity") {
      // For vote_average and popularity, sort in descending order
      return b[sortParam] - a[sortParam];
    } else {
      // For other parameters (e.g., title), sort in ascending order
      if (a[sortParam] < b[sortParam]) {
        return -1;
      }
      if (a[sortParam] > b[sortParam]) {
        return 1;
      }
      return 0;
    }
  });

  // Map the sorted movie data back to an array of movieCards
  return movies.map((movie) => {
    // Find the card with this movie's data
    return movieCards.find(
      (card) => JSON.parse(card.dataset.movie).id === movie.id
    );
  });
}
