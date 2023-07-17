import {
  API_KEY,
  YOUTUBE_URL,
  BASE_URL_MOVIE,
  BASE_URL_MOVIE_SEARCH,
} from "../lib/constants";
import {
  Credits,
  FetchDataResponse,
  FetchMoviesResponse,
  FetchReviewResponse,
  Movie,
  Trailer,
} from "../types/index";

// Function to fetch data from an API endpoint
async function fetchData<T>(url: string): Promise<T> {
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

// Function to fetch movies from the API
export async function fetchMovies(
  pageNumber: number = 1
): Promise<FetchMoviesResponse> {
  try {
    const url = `${BASE_URL_MOVIE}/now_playing?api_key=${API_KEY}&page=${pageNumber}`;
    return await fetchData<FetchMoviesResponse>(url);
  } catch (error) {
    throw new Error(`Failed to fetch movies: ${error}`);
  }
}

// Function to search movies based on a query
export async function searchMovies(
  query: string,
  pageNumber: number = 1
): Promise<FetchMoviesResponse> {
  try {
    const url = `${BASE_URL_MOVIE_SEARCH}?api_key=${API_KEY}&query=${query}&page=${pageNumber}`;
    const data = await fetchData<FetchMoviesResponse>(url);

    // Sort the search results by movie title
    data.results.sort((a: Movie, b: Movie) => a.title.localeCompare(b.title));

    return data;
  } catch (error) {
    throw new Error(`Failed to search movies: ${error}`);
  }
}

// Function to fetch movie details from the API
export async function fetchMovieDetails(
  movieId: string | number
): Promise<Movie> {
  try {
    // Check if the movie details are already cached in local storage
    const cachedMovieDetails = localStorage.getItem(`movie-${movieId}-details`);

    if (cachedMovieDetails) {
      // Return the cached movie details
      return JSON.parse(cachedMovieDetails);
    } else {
      const url = `${BASE_URL_MOVIE}${movieId}?api_key=${API_KEY}`;
      const movieDetails = await fetchData<Movie>(url);

      // Cache the movie details in local storage
      localStorage.setItem(
        `movie-${movieId}-details`,
        JSON.stringify(movieDetails)
      );

      return movieDetails;
    }
  } catch (error) {
    throw new Error(`Failed to fetch movie details: ${error}`);
  }
}

// Function to fetch movie reviews from the API
export async function fetchMovieReviews(
  movieId: string | number
): Promise<FetchReviewResponse> {
  try {
    const url = `${BASE_URL_MOVIE}${movieId}/reviews?api_key=${API_KEY}`;
    return await fetchData<FetchReviewResponse>(url);
  } catch (error) {
    throw new Error(`Failed to fetch movie reviews: ${error}`);
  }
}

// Function to fetch similar movies from the API
export async function fetchSimilarMovies(
  movieId: string | number
): Promise<FetchMoviesResponse> {
  try {
    // Check if the similar movies are already cached in local storage
    const cachedSimilarMovies = localStorage.getItem(
      `movie-${movieId}-similar-movies`
    );

    if (cachedSimilarMovies) {
      // Return the cached similar movies
      return JSON.parse(cachedSimilarMovies);
    } else {
      const url = `${BASE_URL_MOVIE}${movieId}/similar?api_key=${API_KEY}`;
      const similarMovies = await fetchData<FetchMoviesResponse>(url);

      // Cache the similar movies in local storage
      localStorage.setItem(
        `movie-${movieId}-similar-movies`,
        JSON.stringify(similarMovies)
      );

      return similarMovies;
    }
  } catch (error) {
    throw new Error(`Failed to fetch similar movies: ${error}`);
  }
}

// Function to fetch and cache the movie trailer from the API
export async function fetchAndCacheMovieTrailer(
  movieId: string | number
): Promise<string | undefined> {
  try {
    // Check if the movie trailer is already cached in local storage
    const cachedTrailer = localStorage.getItem(`movie-${movieId}-trailer`);

    if (cachedTrailer) {
      // Return the cached trailer URL
      return cachedTrailer;
    } else {
      const url = `${BASE_URL_MOVIE}${movieId}/videos?api_key=${API_KEY}`;
      const data = await fetchData<FetchDataResponse<Trailer>>(url);

      // Find the YouTube trailer from the API response
      const youtubeTrailer = data.results.find(
        (video: Trailer) => video.site === "YouTube" && video.type === "Trailer"
      );

      if (youtubeTrailer) {
        const trailerUrl = `${YOUTUBE_URL}${youtubeTrailer.key}`;

        // Cache the trailer URL in local storage
        localStorage.setItem(`movie-${movieId}-trailer`, trailerUrl);

        return trailerUrl;
      }
    }
  } catch (error) {
    throw new Error(`Failed to fetch and cache movie trailer: ${error}`);
  }
}

// Function to fetch actors for a movie from the API
export async function fetchActors(movieId: number | string): Promise<Credits> {
  try {
    // Check if the actors are already cached in local storage
    const cachedActors = localStorage.getItem(`movie-${movieId}-actors`);

    if (cachedActors) {
      // Return the cached actors
      return JSON.parse(cachedActors) as Credits;
    } else {
      const url = `${BASE_URL_MOVIE}${movieId}/credits?api_key=${API_KEY}`;
      const credits = await fetchData<Credits>(url);

      // Cache the actors in local storage
      localStorage.setItem(`movie-${movieId}-actors`, JSON.stringify(credits));

      return credits;
    }
  } catch (error) {
    throw new Error(`Failed to fetch actors: ${error}`);
  }
}
