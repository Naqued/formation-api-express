/**
 * Basic movie information returned by TMDB API
 */
export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
}

/**
 * TMDB API response format for movie lists
 */
export interface MovieListResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

/**
 * Error response from TMDB API
 */
export interface TMDBError {
    status_message: string;
    status_code: number;
} 