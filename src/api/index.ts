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

export async function searchMovies(
  query: string,
  pageNumber: number = 1
): Promise<FetchMoviesResponse> {
  try {
    const url = `${BASE_URL_MOVIE_SEARCH}?api_key=${API_KEY}&query=${query}&page=${pageNumber}`;
    const data = await fetchData<FetchMoviesResponse>(url);

    data.results.sort((a: Movie, b: Movie) => a.title.localeCompare(b.title));

    return data;
  } catch (error) {
    throw new Error(`Failed to search movies: ${error}`);
  }
}

export async function fetchMovieDetails(
  movieId: string | number
): Promise<Movie> {
  try {
    const cachedMovieDetails = localStorage.getItem(`movie-${movieId}-details`);

    if (cachedMovieDetails) {
      return JSON.parse(cachedMovieDetails);
    } else {
      const url = `${BASE_URL_MOVIE}${movieId}?api_key=${API_KEY}`;
      const movieDetails = await fetchData<Movie>(url);
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

export async function fetchSimilarMovies(
  movieId: string | number
): Promise<FetchMoviesResponse> {
  try {
    const cachedSimilarMovies = localStorage.getItem(
      `movie-${movieId}-similar-movies`
    );

    if (cachedSimilarMovies) {
      return JSON.parse(cachedSimilarMovies);
    } else {
      const url = `${BASE_URL_MOVIE}${movieId}/similar?api_key=${API_KEY}`;
      const similarMovies = await fetchData<FetchMoviesResponse>(url);
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

export async function fetchAndCacheMovieTrailer(
  movieId: string | number
): Promise<string | undefined> {
  try {
    const cachedTrailer = localStorage.getItem(`movie-${movieId}-trailer`);

    if (cachedTrailer) {
      return cachedTrailer;
    } else {
      const url = `${BASE_URL_MOVIE}${movieId}/videos?api_key=${API_KEY}`;
      const data = await fetchData<FetchDataResponse<Trailer>>(url);
      const youtubeTrailer = data.results.find(
        (video: Trailer) => video.site === "YouTube" && video.type === "Trailer"
      );

      if (youtubeTrailer) {
        const trailerUrl = `${YOUTUBE_URL}${youtubeTrailer.key}`;
        localStorage.setItem(`movie-${movieId}-trailer`, trailerUrl);

        return trailerUrl;
      }
    }
  } catch (error) {
    throw new Error(`Failed to fetch and cache movie trailer: ${error}`);
  }
}

export async function fetchActors(movieId: number | string): Promise<Credits> {
  try {
    const cachedActors = localStorage.getItem(`movie-${movieId}-actors`);

    if (cachedActors) {
      return JSON.parse(cachedActors) as Credits;
    } else {
      const url = `${BASE_URL_MOVIE}${movieId}/credits?api_key=${API_KEY}`;
      const credits = await fetchData<Credits>(url);
      localStorage.setItem(`movie-${movieId}-actors`, JSON.stringify(credits));

      return credits;
    }
  } catch (error) {
    throw new Error(`Failed to fetch actors: ${error}`);
  }
}
