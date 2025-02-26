import { WeatherMood, weatherToGenreMap } from '../types/weatherGenreMapping';

export class MoodService {
  private selectRandomMood(moods: WeatherMood[]): WeatherMood {
    const random = Math.random();
    let cumulativeProbability = 0;
    
    for (const mood of moods) {
      cumulativeProbability += mood.probability;
      if (random <= cumulativeProbability) {
        return mood;
      }
    }
    
    return moods[0]; // Fallback
  }

  public getMoodForWeather(weather: string): WeatherMood {
    const weatherMapping = weatherToGenreMap.find(w => w.weatherCode === weather);
    if (!weatherMapping) {
      throw new Error(`No mood mapping for weather: ${weather}`);
    }
    
    return this.selectRandomMood(weatherMapping.moods);
  }
} 