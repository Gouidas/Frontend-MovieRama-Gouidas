import { fetchMovies } from "./api/index.js";
import { createAndSetUpCard } from "./components/movieCard.js";
import { searchMovies } from "./api/index.js";
import { state } from "./helpers/currentSearchQuery.js";
import { sortMovies } from "./helpers/sortMovies.js";
import { createLoadingScreen } from "./components/loadingScreen.js";
import { createErrorComponent } from "./components/createErrorComponent.js";

window.onbeforeunload = function () {
  localStorage.clear();
};

export async function loadMovies() {
  console.log("loadMovies function is called");

  // Create and add the loading screen to the body
  const loadingScreen = createLoadingScreen();
  document.body.appendChild(loadingScreen);

  try {
    const movies = await fetchMovies();
    console.log(movies.results);
    const movieListContainer = document.getElementById("movie-list-container");
    const movieCards = await Promise.all(
      movies.results.map((movie) => createAndSetUpCard(movie, false, false))
    );

    // sort the movieCards by title
    const sortedMovieCards = sortMovies(movieCards, "title");

    movieListContainer.innerHTML = ""; // Clear the container

    // append sortedMovieCards instead of movieCards
    sortedMovieCards.forEach((card) => movieListContainer.appendChild(card));

    // Set the sortSelector to "Title"
    document.getElementById("sortSelector").value = "title";
  } catch (error) {
    createErrorComponent(error.message);
  } finally {
    // Remove the loading screen from the body
    document.body.removeChild(loadingScreen);
  }
}
// Call loadMovies once at the start to load the first page of movies
loadMovies();

// Add event listener to load more movies when the user scrolls to the bottom of the page
let loadingMoreMovies = false; // Flag to track loading state
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

async function loadMoreMovies() {
  const movieListContainer = document.getElementById("movie-list-container");

  // Set the loading flag to true to prevent multiple simultaneous loading
  loadingMoreMovies = true;

  // Create and add the loading screen to the body
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
      searchResultCards.forEach((card) => movieListContainer.appendChild(card));
    } else {
      currentPage += 1;
      const movies = await fetchMovies(currentPage);
      const moreMovieCards = await Promise.all(
        movies.results.map((movie) => createAndSetUpCard(movie, false, false))
      );
      moreMovieCards.forEach((card) => movieListContainer.appendChild(card));
    }

    // Set the sortSelector to "Title"
    document.getElementById("sortSelector").value = "title";
  } catch (error) {
    createErrorComponent(error.message);
  } finally {
    // Set the loading flag back to false after loading is complete
    loadingMoreMovies = false;

    // Remove the loading screen
    document.body.removeChild(loadingScreen);
  }
}
