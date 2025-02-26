import { WeatherService } from './weatherService';
import { TMDBService } from './tmdbService';
import { MoodService } from './moodService';
import { MovieListResponse } from '../types/tmdb';

interface MovieRecommendation {
    weather: string;
    mood: string;
    description: string;
    movies: MovieListResponse['results'];
}

export class RecommendationService {
    private moodService: MoodService;

    constructor(
        private weatherService: WeatherService,
        private tmdbService: TMDBService
    ) {
        this.moodService = new MoodService();
    }

    async getRecommendationsByCity(city: string): Promise<MovieRecommendation> {
        try {
            // 1. Get weather for the city
            const weather = await this.weatherService.getWeatherByCity(city);
            const weatherCondition = weather.weather[0].main;

            // 2. Get mood and genres for the weather
            const weatherMood = this.moodService.getMoodForWeather(weatherCondition);

            // 3. Get movie recommendations based on primary genre
            const movies = await this.tmdbService.getMoviesByGenre(
                weatherMood.genres[0],
                1
            );

            // 4. Return formatted response
            return {
                weather: weatherCondition,
                mood: weatherMood.mood,
                description: weatherMood.description,
                movies: movies.results.slice(0, 5)
            };
        } catch (error) {
            throw new Error(`Failed to get recommendations: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
} 