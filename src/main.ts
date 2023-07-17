import { fetchMovies } from "./api/index";
import { createAndSetUpCard } from "./components/movieCard";
import { searchMovies } from "./api/index";
import { state } from "./lib/currentSearchQuery";
import { sortMovies } from "./lib/sortMovies";
import { createLoadingScreen } from "./components/loadingScreen";
import { createErrorComponent } from "./components/createErrorComponent";
import "./components/header";
import "./components/searchBox";
import "./components/sortSelector";

window.onbeforeunload = function () {
  localStorage.clear();
};

export async function loadMovies(): Promise<void> {
  const loadingScreen = createLoadingScreen();
  document.body.appendChild(loadingScreen);

  try {
    const movies = await fetchMovies();
    const movieListContainer = document.getElementById("movie-list-container");
    const movieCards = await Promise.all(
      movies.results.map((movie) => createAndSetUpCard(movie, false, false))
    );

    const filteredMovieCards = movieCards.filter((card) => card !== undefined);

    const sortedMovieCards = sortMovies(
      filteredMovieCards as HTMLElement[],
      "title"
    );

    if (movieListContainer) {
      movieListContainer.innerHTML = "";

      sortedMovieCards.forEach((card) => {
        if (card) {
          movieListContainer.appendChild(card);
        }
      });

      const sortSelector = document.getElementById(
        "sortSelector"
      ) as HTMLSelectElement;
      if (sortSelector) {
        sortSelector.value = "title";
      }
    }
  } catch (error: any) {
    createErrorComponent(error.message);
  } finally {
    if (loadingScreen && loadingScreen.parentNode) {
      loadingScreen.parentNode.removeChild(loadingScreen);
    }
  }
}

loadMovies();

let loadingMoreMovies = false;
window.addEventListener("scroll", () => {
  const scrollThreshold = 400;
  const distanceToBottom =
    document.documentElement.getBoundingClientRect().bottom -
    window.innerHeight;

  if (!loadingMoreMovies && distanceToBottom <= scrollThreshold) {
    loadMoreMovies();
  }
});

let currentPage = 1;

async function loadMoreMovies(): Promise<void> {
  const movieListContainer = document.getElementById("movie-list-container");

  loadingMoreMovies = true;

  const loadingScreen = createLoadingScreen();
  document.body.appendChild(loadingScreen);

  try {
    if (state.currentSearchQuery !== "") {
      currentPage += 1;
      const searchResults = await searchMovies(
        state.currentSearchQuery,
        currentPage
      );
      const searchResultCards = await Promise.all(
        searchResults.results.map((movie) =>
          createAndSetUpCard(movie, false, false)
        )
      );
      if (movieListContainer) {
        searchResultCards.forEach((card) => {
          if (card) {
            movieListContainer.appendChild(card);
          }
        });
      }
    } else {
      currentPage += 1;
      const movies = await fetchMovies(currentPage);
      const moreMovieCards = await Promise.all(
        movies.results.map((movie) => createAndSetUpCard(movie, false, false))
      );
      if (movieListContainer) {
        moreMovieCards.forEach((card) => {
          if (card) {
            movieListContainer.appendChild(card);
          }
        });
      }
    }

    const sortSelector = document.getElementById(
      "sortSelector"
    ) as HTMLSelectElement;
    if (sortSelector) {
      sortSelector.value = "title";
    }
  } catch (error: any) {
    createErrorComponent(error.message);
  } finally {
    loadingMoreMovies = false;

    if (loadingScreen && loadingScreen.parentNode) {
      loadingScreen.parentNode.removeChild(loadingScreen);
    }
  }
}
