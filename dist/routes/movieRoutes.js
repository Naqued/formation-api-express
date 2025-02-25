"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weatherService_1 = require("../services/weatherService");
const tmdbService_1 = require("../services/tmdbService");
const recommendationService_1 = require("../services/recommendationService");
const validators_1 = require("../middleware/validators");
const router = (0, express_1.Router)();
// Injection des dépendances
const weatherService = new weatherService_1.WeatherService();
const tmdbService = new tmdbService_1.TMDBService();
const recommendationService = new recommendationService_1.RecommendationService(weatherService, tmdbService);
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
router.get('/recommend', validators_1.cityValidationRules, validators_1.validateCity, (async (req, res) => {
    try {
        const city = req.query.city;
        const recommendation = await recommendationService.getRecommendationsByCity(city);
        res.json(recommendation);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Erreur inconnue'
        });
    }
}));
exports.default = router;
