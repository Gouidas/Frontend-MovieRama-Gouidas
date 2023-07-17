// Define the Movie interface
interface Movie {
  id: number;
  [key: string]: string | number | Date;
}

export const sortMovies = (
  movieCards: HTMLElement[],
  sortParam: string
): HTMLElement[] => {
  // Convert movieCards to an array of Movie objects
  const movies: Movie[] = movieCards.map((card) =>
    JSON.parse(card.dataset.movie as string)
  );

  // Sort the movies based on the specified sortParam
  movies.sort((a, b) => {
    if (sortParam === "release_date") {
      // Sort by release date in descending order
      const dateA = new Date(a[sortParam]);
      const dateB = new Date(b[sortParam]);
      return Number(dateB) - Number(dateA);
    } else if (sortParam === "vote_average" || sortParam === "popularity") {
      // Sort by vote average or popularity in descending order
      return Number(b[sortParam]) - Number(a[sortParam]);
    } else {
      // Sort by other parameters in ascending order
      if (a[sortParam] < b[sortParam]) {
        return -1;
      }
      if (a[sortParam] > b[sortParam]) {
        return 1;
      }
      return 0;
    }
  });

  // Return the sorted movie cards based on the movie IDs
  return movies.map((movie) => {
    return movieCards.find(
      (card) => JSON.parse(card.dataset.movie as string).id === movie.id
    ) as HTMLElement;
  });
};
