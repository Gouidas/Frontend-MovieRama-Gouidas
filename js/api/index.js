// const API_KEY = "bc50218d91157b1ba4f142ef7baaa6a0";
// const BASE_URL = "https://api.themoviedb.org/3";
import { API_KEY, BASE_URL } from "../../constants.js";

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function fetchMovies(pageNumber = 1) {
  try {
    return await fetchData(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${pageNumber}`
    );
  } catch (error) {
    throw new Error(`Failed to fetch movies: ${error}`);
  }
}

export async function searchMovies(query, pageNumber = 1) {
  try {
    const data = await fetchData(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${pageNumber}`
    );

    // Sort the search results by title
    data.results.sort((a, b) => a.title.localeCompare(b.title));

    return data;
  } catch (error) {
    throw new Error(`Failed to search movies: ${error}`);
  }
}

export async function fetchMovieDetails(movieId) {
  try {
    console.log("Fetching movie details");
    return await fetchData(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  } catch (error) {
    throw new Error(`Failed to fetch movie details: ${error}`);
  }
}

export async function fetchMovieReviews(movieId) {
  try {
    return await fetchData(
      `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
    );
  } catch (error) {
    throw new Error(`Failed to fetch movie reviews: ${error}`);
  }
}

export async function fetchSimilarMovies(movieId) {
  try {
    return await fetchData(
      `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`
    );
  } catch (error) {
    throw new Error(`Failed to fetch similar movies: ${error}`);
  }
}

export async function fetchAndCacheMovieTrailer(movieId) {
  try {
    if (localStorage.getItem(`movie-${movieId}-trailer`)) {
      console.log("Loading trailer from cache");
      return localStorage.getItem(`movie-${movieId}-trailer`);
    } else {
      console.log("Fetching trailer from API");
      const data = await fetchData(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
      );
      const youtubeTrailer = data.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );

      if (youtubeTrailer) {
        const trailerUrl = `https://www.youtube.com/embed/${youtubeTrailer.key}`;
        console.log("Caching trailer URL", trailerUrl);
        localStorage.setItem(`movie-${movieId}-trailer`, trailerUrl);

        return trailerUrl;
      }
    }
  } catch (error) {
    throw new Error(`Failed to fetch and cache movie trailer: ${error}`);
  }
}

export async function fetchActors(movieId) {
  try {
    return await fetchData(
      `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
    );
  } catch (error) {
    throw new Error(`Failed to fetch /credits movies: ${error}`);
  }
}
