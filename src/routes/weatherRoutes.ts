import { Router, RequestHandler } from 'express';
import { WeatherService } from '../services/weatherService';

const router = Router();
const weatherService = new WeatherService();

const getWeather: RequestHandler = async (req, res) => {
    try {
        const city = req.query.city as string;
        
        if (!city) {
            res.status(400).json({
                error: 'City parameter is required'
            });
            return;
        }

        const weatherData = await weatherService.getWeatherByCity(city);
        res.json(weatherData);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        res.status(500).json({
            error: errorMessage
        });
    }
};

router.get('/weather', getWeather);

export default router; 