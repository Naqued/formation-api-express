"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TMDBService = void 0;
const axios_1 = __importStar(require("axios"));
class TMDBService {
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
    async searchMovies(query, page = 1) {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/search/movie`, {
                params: {
                    api_key: this.apiKey,
                    query,
                    page,
                    language: 'fr-FR' // For French results
                }
            });
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_1.AxiosError && error.response) {
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
    async getMoviesByGenre(genreId, page = 1) {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/discover/movie`, {
                params: {
                    api_key: this.apiKey,
                    with_genres: genreId,
                    page,
                    language: 'fr-FR',
                    sort_by: 'popularity.desc'
                }
            });
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_1.AxiosError && error.response) {
                throw new Error(`TMDB API Error: ${error.response.data.status_message}`);
            }
            throw new Error('Failed to get movies by genre');
        }
    }
    /**
     * Get movie details by ID
     * @param movieId TMDB movie ID
     */
    async getMovieDetails(movieId) {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/movie/${movieId}`, {
                params: {
                    api_key: this.apiKey,
                    language: 'fr-FR'
                }
            });
            return response.data;
        }
        catch (error) {
            if (error instanceof axios_1.AxiosError && error.response) {
                throw new Error(`TMDB API Error: ${error.response.data.status_message}`);
            }
            throw new Error('Failed to get movie details');
        }
    }
}
exports.TMDBService = TMDBService;
