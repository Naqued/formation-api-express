import { WeatherService } from './weatherService';
import { TMDBService } from './tmdbService';
import { weatherToGenreMap } from '../types/weatherGenreMapping';
import { MovieListResponse } from '../types/tmdb';

interface MovieRecommendation {
    weather: string;
    mood: string;
    description: string;
    movies: MovieListResponse['results'];
}

export class RecommendationService {
    constructor(
        private weatherService: WeatherService,
        private tmdbService: TMDBService
    ) {}

    async getRecommendationsByCity(city: string): Promise<MovieRecommendation> {
        try {
            // 1. Get weather for the city
            const weather = await this.weatherService.getWeatherByCity(city);
            const weatherCondition = weather.weather[0].main;

            // 2. Find corresponding genre mapping
            const mapping = weatherToGenreMap.find(
                m => m.weatherCode === weatherCondition
            );

            if (!mapping) {
                throw new Error(`No recommendations available for weather: ${weatherCondition}`);
            }

            // 3. Get movie recommendations
            const movies = await this.tmdbService.getMoviesByGenre(
                mapping.genres[0], // Using primary genre
                1 // First page
            );

            // 4. Return formatted response
            return {
                weather: weatherCondition,
                mood: mapping.mood,
                description: mapping.description,
                movies: movies.results.slice(0, 5) // Return top 5 movies
            };
        } catch (error) {
            throw new Error(`Failed to get recommendations: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
} 