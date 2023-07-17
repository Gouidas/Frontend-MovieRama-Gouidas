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

// Clear local storage when the window is closed or refreshed
window.onbeforeunload = function () {
  localStorage.clear();
};

// Function to load initial set of movies
export async function loadMovies(): Promise<void> {
  const loadingScreen = createLoadingScreen();
  document.body.appendChild(loadingScreen);

  try {
    // Fetch movies from the API
    const movies = await fetchMovies();

    // Get the movie list container element
    const movieListContainer = document.getElementById("movie-list-container");

    // Create movie cards and set them up
    const movieCards = await Promise.all(
      movies.results.map((movie) => createAndSetUpCard(movie, false, false))
    );

    // Filter out undefined movie cards
    const filteredMovieCards = movieCards.filter((card) => card !== undefined);

    // Sort the filtered movie cards by title
    const sortedMovieCards = sortMovies(
      filteredMovieCards as HTMLElement[],
      "title"
    );

    if (movieListContainer) {
      // Clear the movie list container
      movieListContainer.innerHTML = "";

      // Append the sorted movie cards to the movie list container
      sortedMovieCards.forEach((card) => {
        if (card) {
          movieListContainer.appendChild(card);
        }
      });

      // Set the sortSelector value to "title"
      const sortSelector = document.getElementById(
        "sortSelector"
      ) as HTMLSelectElement;
      if (sortSelector) {
        sortSelector.value = "title";
      }
    }
  } catch (error: any) {
    // Handle errors by creating an error component
    createErrorComponent(error.message);
  } finally {
    // Remove the loading screen from the DOM
    if (loadingScreen && loadingScreen.parentNode) {
      loadingScreen.parentNode.removeChild(loadingScreen);
    }
  }
}

// Load initial set of movies
loadMovies();

// Flag to track loading state for loading more movies
let loadingMoreMovies = false;

// Add event listener to load more movies when the user scrolls to the bottom of the page
window.addEventListener("scroll", () => {
  const scrollThreshold = 400;
  const distanceToBottom =
    document.documentElement.getBoundingClientRect().bottom -
    window.innerHeight;

  if (!loadingMoreMovies && distanceToBottom <= scrollThreshold) {
    loadMoreMovies();
  }
});

// Variable to track the current page for loading more movies
let currentPage = 1;

// Function to load more movies
async function loadMoreMovies(): Promise<void> {
  const movieListContainer = document.getElementById("movie-list-container");

  // Set the loading flag to true to prevent multiple simultaneous loading
  loadingMoreMovies = true;

  // Create and add the loading screen to the body
  const loadingScreen = createLoadingScreen();
  document.body.appendChild(loadingScreen);

  try {
    if (state.currentSearchQuery !== "") {
      // Increment the current page
      currentPage += 1;

      // Search for movies based on the current search query and page number
      const searchResults = await searchMovies(
        state.currentSearchQuery,
        currentPage
      );

      // Create and set up movie cards for the search results
      const searchResultCards = await Promise.all(
        searchResults.results.map((movie) =>
          createAndSetUpCard(movie, false, false)
        )
      );

      if (movieListContainer) {
        // Append the search result cards to the movie list container
        searchResultCards.forEach((card) => {
          if (card) {
            movieListContainer.appendChild(card);
          }
        });
      }
    } else {
      // Increment the current page
      currentPage += 1;

      // Fetch movies from the API based on the current page
      const movies = await fetchMovies(currentPage);

      // Create and set up movie cards for the fetched movies
      const moreMovieCards = await Promise.all(
        movies.results.map((movie) => createAndSetUpCard(movie, false, false))
      );

      if (movieListContainer) {
        // Append the additional movie cards to the movie list container
        moreMovieCards.forEach((card) => {
          if (card) {
            movieListContainer.appendChild(card);
          }
        });
      }
    }

    // Set the sortSelector value to "title"
    const sortSelector = document.getElementById(
      "sortSelector"
    ) as HTMLSelectElement;
    if (sortSelector) {
      sortSelector.value = "title";
    }
  } catch (error: any) {
    // Handle errors by creating an error component
    createErrorComponent(error.message);
  } finally {
    // Set the loading flag back to false after loading is complete
    loadingMoreMovies = false;

    // Remove the loading screen from the DOM
    if (loadingScreen && loadingScreen.parentNode) {
      loadingScreen.parentNode.removeChild(loadingScreen);
    }
  }
}
