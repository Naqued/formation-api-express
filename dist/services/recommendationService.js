"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationService = void 0;
const weatherGenreMapping_1 = require("../types/weatherGenreMapping");
class RecommendationService {
    constructor(weatherService, tmdbService) {
        this.weatherService = weatherService;
        this.tmdbService = tmdbService;
    }
    async getRecommendationsByCity(city) {
        try {
            // 1. Get weather for the city
            const weather = await this.weatherService.getWeatherByCity(city);
            const weatherCondition = weather.weather[0].main;
            // 2. Find corresponding genre mapping
            const mapping = weatherGenreMapping_1.weatherToGenreMap.find(m => m.weatherCode === weatherCondition);
            if (!mapping) {
                throw new Error(`No recommendations available for weather: ${weatherCondition}`);
            }
            // 3. Get movie recommendations
            const movies = await this.tmdbService.getMoviesByGenre(mapping.genres[0], // Using primary genre
            1 // First page
            );
            // 4. Return formatted response
            return {
                weather: weatherCondition,
                mood: mapping.mood,
                description: mapping.description,
                movies: movies.results.slice(0, 5) // Return top 5 movies
            };
        }
        catch (error) {
            throw new Error(`Failed to get recommendations: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
}
exports.RecommendationService = RecommendationService;
