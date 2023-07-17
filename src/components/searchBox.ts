import { searchMovies } from "../api/index";
import { createAndSetUpCard } from "./movieCard";
import { loadMovies } from "../main";
import { state } from "../lib/currentSearchQuery";
import { createErrorComponent } from "./createErrorComponent";
import { Movie } from "../types/index";

const searchContainer = document.getElementById("search-container");
if (searchContainer) {
  searchContainer.innerHTML = `
    <input type="text" id="search" placeholder="Search for movies..." />
  `;
}

const searchBox = document.getElementById("search");
let timeout: NodeJS.Timeout | undefined;

if (searchBox) {
  searchBox.addEventListener("keyup", (e) => {
    clearTimeout(timeout);
    const target = e.target as HTMLInputElement;
    timeout = setTimeout(() => {
      handleSearch(target.value);
    }, 500);
  });
}

const handleSearch = async (query: string) => {
  state.currentSearchQuery = query;
  const movieListContainer = document.getElementById("movie-list-container");
  if (movieListContainer) {
    movieListContainer.innerHTML = "";
  }

  try {
    if (query !== "") {
      const searchResults = await searchMovies(query);
      const movieCards = await Promise.all(
        searchResults.results.map((movie: Movie) => createAndSetUpCard(movie))
      );

      if (movieListContainer) {
        if (movieCards.length === 0) {
          movieListContainer.innerHTML =
            "<p class=no-movies>We couldn't find any movies matching your search.</p>";
        } else {
          movieCards.forEach((card) => {
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
    } else {
      loadMovies();
    }
  } catch (error: any) {
    const errorComponent = createErrorComponent(error.message);
    document.body.appendChild(errorComponent);
    setTimeout(() => {
      if (document.body.contains(errorComponent)) {
        document.body.removeChild(errorComponent);
      }
    }, 4000);
  }
};
