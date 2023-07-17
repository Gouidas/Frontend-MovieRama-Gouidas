export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
  genres: { name: string }[];
}

interface Dates {
  maximum: string;
  minimum: string;
}

export interface FetchMoviesResponse {
  dates: Dates;
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Trailer {
  key: string;
  site: string;
  type: string;
}

export interface Review {
  id: string;
  author: string;
  content: string;
}

export interface FetchReviewResponse {
  id: string;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

export interface FetchDataResponse<T> {
  results: T[];
}

export interface Credits {
  id: number;
  cast: Actor[];
  crew: CrewMember[];
}

export interface Actor {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface MovieDetails {
  genres: { name: string }[];
  release_date: string;
  vote_average: number;
  title: string;
  overview: string;
}

export interface GenresList {
  genres: { name: string }[];
}
