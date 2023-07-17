interface Movie {
  id: number;
  [key: string]: string | number | Date;
}

export const sortMovies = (
  movieCards: HTMLElement[],
  sortParam: string
): HTMLElement[] => {
  const movies: Movie[] = movieCards.map((card) =>
    JSON.parse(card.dataset.movie as string)
  );

  movies.sort((a, b) => {
    if (sortParam === "release_date") {
      const dateA = new Date(a[sortParam]);
      const dateB = new Date(b[sortParam]);
      return Number(dateB) - Number(dateA);
    } else if (sortParam === "vote_average" || sortParam === "popularity") {
      return Number(b[sortParam]) - Number(a[sortParam]);
    } else {
      if (a[sortParam] < b[sortParam]) {
        return -1;
      }
      if (a[sortParam] > b[sortParam]) {
        return 1;
      }
      return 0;
    }
  });

  return movies.map((movie) => {
    return movieCards.find(
      (card) => JSON.parse(card.dataset.movie as string).id === movie.id
    ) as HTMLElement;
  });
};
