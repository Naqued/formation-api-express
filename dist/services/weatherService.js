"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class WeatherService {
    constructor() {
        this.apiKey = process.env.OPENWEATHER_API_KEY || '';
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    }
    async getWeatherByCity(city) {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/weather`, {
                params: {
                    q: city,
                    appid: this.apiKey,
                    units: 'metric'
                }
            });
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                throw new Error(`Weather API error: ${error.response?.data.message || error.message}`);
            }
            throw error;
        }
    }
}
exports.WeatherService = WeatherService;
