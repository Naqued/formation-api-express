import { MovieGenres } from './tmdb';

/**
 * Interface for weather to movie genre mapping
 */
export interface WeatherMood {
    mood: string;
    description: string;
    genres: number[];
    probability: number;
}

export interface WeatherGenreMapping {
    weatherCode: string;
    moods: WeatherMood[];
}


/**
 * Mapping between weather conditions and movie genres
 */
export const weatherToGenreMap: WeatherGenreMapping[] = [
    {
        weatherCode: 'Clouds',
        moods: [
            {
                mood: 'rêveur',
                description: 'Les nuages nous invitent à l\'évasion',
                genres: [MovieGenres.FANTASY, MovieGenres.DRAMA],
                probability: 0.3
            },
            {
                mood: 'mystérieux',
                description: 'Une atmosphère propice aux mystères',
                genres: [MovieGenres.MYSTERY, MovieGenres.THRILLER],
                probability: 0.3
            },
            {
                mood: 'contemplatif',
                description: 'Un moment pour la réflexion',
                genres: [MovieGenres.DRAMA, MovieGenres.ROMANCE],
                probability: 0.2
            },
            {
                mood: 'nostalgique',
                description: 'Un temps idéal pour les souvenirs',
                genres: [MovieGenres.DRAMA, MovieGenres.FAMILY],
                probability: 0.2
            }
        ]
    },
    {
        weatherCode: 'Clear',
        moods: [
            {
                mood: 'énergique',
                description: 'Le soleil nous donne de l\'énergie',
                genres: [MovieGenres.ACTION, MovieGenres.ADVENTURE],
                probability: 0.3
            },
            {
                mood: 'joyeux',
                description: 'Une journée parfaite pour rire',
                genres: [MovieGenres.COMEDY, MovieGenres.FAMILY],
                probability: 0.3
            },
            {
                mood: 'optimiste',
                description: 'Le beau temps inspire l\'optimisme',
                genres: [MovieGenres.ANIMATION, MovieGenres.ADVENTURE],
                probability: 0.2
            },
            {
                mood: 'romantique',
                description: 'Une belle journée pour l\'amour',
                genres: [MovieGenres.ROMANCE, MovieGenres.COMEDY],
                probability: 0.2
            }
        ]
    },
    {
        weatherCode: 'Rain',
        moods: [
            {
                mood: 'mélancolique',
                description: 'La pluie invite à la réflexion',
                genres: [MovieGenres.DRAMA, MovieGenres.ROMANCE],
                probability: 0.3
            },
            {
                mood: 'intriguant',
                description: 'Un temps parfait pour le mystère',
                genres: [MovieGenres.MYSTERY, MovieGenres.THRILLER],
                probability: 0.3
            },
            {
                mood: 'cocooning',
                description: 'Moment idéal pour se blottir devant un film',
                genres: [MovieGenres.FAMILY, MovieGenres.ANIMATION],
                probability: 0.2
            },
            {
                mood: 'intense',
                description: 'La pluie amplifie les émotions',
                genres: [MovieGenres.DRAMA, MovieGenres.THRILLER],
                probability: 0.2
            }
        ]
    },
    {
        weatherCode: 'Snow',
        moods: [
            {
                mood: 'féérique',
                description: 'La neige nous transporte dans un monde magique',
                genres: [MovieGenres.FANTASY, MovieGenres.ANIMATION],
                probability: 0.4
            },
            {
                mood: 'chaleureux',
                description: 'Un temps pour se réunir en famille',
                genres: [MovieGenres.FAMILY, MovieGenres.COMEDY],
                probability: 0.3
            },
            {
                mood: 'aventureux',
                description: 'L\'appel de l\'aventure hivernale',
                genres: [MovieGenres.ADVENTURE, MovieGenres.ACTION],
                probability: 0.3
            }
        ]
    }
]; 