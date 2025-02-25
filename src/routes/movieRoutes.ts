import { Router, Request, Response, RequestHandler } from 'express';
import { WeatherService } from '../services/weatherService';
import { TMDBService } from '../services/tmdbService';
import { RecommendationService } from '../services/recommendationService';
import { validateCity, cityValidationRules } from '../middleware/validators';

const router = Router();

// Injection des dépendances
const weatherService = new WeatherService();
const tmdbService = new TMDBService();
const recommendationService = new RecommendationService(weatherService, tmdbService);

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: API de recommandation de films basée sur la météo
 */

/**
 * @swagger
 * /api/movies/recommend:
 *   get:
 *     summary: Obtenir des recommandations de films selon la météo
 *     description: Retourne une liste de films recommandés en fonction de la météo de la ville
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom de la ville
 *         example: Paris
 *     responses:
 *       200:
 *         description: Recommandations de films
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 weather:
 *                   type: string
 *                   example: Clear
 *                 mood:
 *                   type: string
 *                   example: énergique
 *                 description:
 *                   type: string
 *                   example: Par beau temps, on se sent aventureux !
 *                 movies:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Paramètres invalides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                       param:
 *                         type: string
 *                       value:
 *                         type: string
 *       500:
 *         description: Erreur serveur
 */

/**
 * @route GET /api/movies/recommend
 * @desc Get movie recommendations based on weather in a city
 * @param {string} city - The city name to get weather-based recommendations
 * @returns {Object} Weather info, mood, description and recommended movies
 */
router.get('/recommend', cityValidationRules, validateCity, (async (req: Request, res: Response) => {
    try {
        const city = req.query.city as string;
        const recommendation = await recommendationService.getRecommendationsByCity(city);
        res.json(recommendation);
    } catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Erreur inconnue'
        });
    }
}) as RequestHandler);

export default router; 