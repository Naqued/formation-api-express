import { Router, Request, Response, RequestHandler } from 'express';
import { WeatherService } from '../services/weatherService';
import { TMDBService } from '../services/tmdbService';
import { RecommendationService } from '../services/recommendationService';

const router = Router();

// Injection des dépendances
const weatherService = new WeatherService();
const tmdbService = new TMDBService();
const recommendationService = new RecommendationService(weatherService, tmdbService);

/**
 * @route GET /api/movies/recommend
 * @desc Get movie recommendations based on weather in a city
 * @param {string} city - The city name to get weather-based recommendations
 * @returns {Object} Weather info, mood, description and recommended movies
 */
router.get('/recommend', (async (req: Request, res: Response) => {
    try {
        const city = req.query.city as string;
        
        if (!city) {
            return res.status(400).json({
                error: 'Le paramètre city est requis'
            });
        }

        const recommendation = await recommendationService.getRecommendationsByCity(city);
        res.json(recommendation);
    } catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Erreur inconnue'
        });
    }
}) as RequestHandler);

export default router; 