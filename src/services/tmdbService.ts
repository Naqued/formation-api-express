import axios, { AxiosError } from 'axios';
import { Movie, MovieListResponse } from '../types/tmdb';

export class TMDBService {
    private readonly apiKey: string;
    private readonly baseUrl: string;

    constructor() {
        // Make sure these environment variables are set
        if (!process.env.TMDB_API_KEY) {
            throw new Error('TMDB_API_KEY is not defined in environment variables');
        }

        this.apiKey = process.env.TMDB_API_KEY;
        this.baseUrl = 'https://api.themoviedb.org/3';
    }

    /**
     * Search for movies by title
     * @param query Search term
     * @param page Page number (optional, defaults to 1)
     */
    async searchMovies(query: string, page: number = 1): Promise<MovieListResponse> {
        try {
            const response = await axios.get<MovieListResponse>(`${this.baseUrl}/search/movie`, {
                params: {
                    api_key: this.apiKey,
                    query,
                    page,
                    language: 'fr-FR' // For French results
                }
            });
            
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                throw new Error(`TMDB API Error: ${error.response.data.status_message}`);
            }
            throw new Error('Failed to search movies');
        }
    }

    /**
     * Get movies by genre
     * @param genreId TMDB genre ID
     * @param page Page number (optional, defaults to 1)
     */
    async getMoviesByGenre(genreId: number, page: number = 1): Promise<MovieListResponse> {
        try {
            const response = await axios.get<MovieListResponse>(`${this.baseUrl}/discover/movie`, {
                params: {
                    api_key: this.apiKey,
                    with_genres: genreId,
                    page,
                    language: 'fr-FR',
                    sort_by: 'popularity.desc'
                }
            });

            return response.data;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                throw new Error(`TMDB API Error: ${error.response.data.status_message}`);
            }
            throw new Error('Failed to get movies by genre');
        }
    }

    /**
     * Get movie details by ID
     * @param movieId TMDB movie ID
     */
    async getMovieDetails(movieId: number): Promise<Movie> {
        try {
            const response = await axios.get<Movie>(`${this.baseUrl}/movie/${movieId}`, {
                params: {
                    api_key: this.apiKey,
                    language: 'fr-FR'
                }
            });

            return response.data;
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                throw new Error(`TMDB API Error: ${error.response.data.status_message}`);
            }
            throw new Error('Failed to get movie details');
        }
    }
} 