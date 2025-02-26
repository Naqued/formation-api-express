/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 550
 *         title:
 *           type: string
 *           example: Fight Club
 *         overview:
 *           type: string
 *           example: Un employé de bureau insomniaque...
 *         poster_path:
 *           type: string
 *           nullable: true
 *           example: "/path/to/poster.jpg"
 *         release_date:
 *           type: string
 *           format: date
 *           example: "1999-10-15"
 *         vote_average:
 *           type: number
 *           format: float
 *           example: 8.4
 *         genre_ids:
 *           type: array
 *           items:
 *             type: integer
 *           example: [28, 18, 53]
 */

export enum MovieGenres {
    ACTION = 28,
    ADVENTURE = 12,
    ANIMATION = 16,
    COMEDY = 35,
    DRAMA = 18,
    FANTASY = 14,
    HORROR = 27,
    ROMANCE = 10749,
    THRILLER = 53,
    SCIENCE_FICTION = 878,
    MYSTERY = 9648,
    FAMILY = 10751
}

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