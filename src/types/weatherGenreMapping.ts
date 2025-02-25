/**
 * Interface for weather to movie genre mapping
 */
export interface WeatherGenreMapping {
    weatherCode: string;
    genres: number[];
    mood: string;
    description: string;
}

/**
 * Genre IDs from TMDB API
 * @see https://developers.themoviedb.org/3/genres/get-movie-list
 */
export enum MovieGenres {
    ACTION = 28,
    ADVENTURE = 12,
    ANIMATION = 16,
    COMEDY = 35,
    DRAMA = 18,
    FANTASY = 14,
    HORROR = 27,
    ROMANCE = 10749,
    THRILLER = 53,
    SCIENCE_FICTION = 878,
    MYSTERY = 9648,
    FAMILY = 10751
}

/**
 * Mapping between weather conditions and movie genres
 */
export const weatherToGenreMap: WeatherGenreMapping[] = [
    {
        weatherCode: 'Clear',
        genres: [MovieGenres.ADVENTURE, MovieGenres.ACTION, MovieGenres.FAMILY],
        mood: 'énergique',
        description: 'Par beau temps, on se sent aventureux !'
    },
    {
        weatherCode: 'Rain',
        genres: [MovieGenres.DRAMA, MovieGenres.ROMANCE],
        mood: 'mélancolique',
        description: 'Temps idéal pour un film émouvant'
    },
    {
        weatherCode: 'Snow',
        genres: [MovieGenres.FANTASY, MovieGenres.ANIMATION],
        mood: 'féérique',
        description: 'La neige nous transporte dans un monde magique'
    },
    {
        weatherCode: 'Thunderstorm',
        genres: [MovieGenres.HORROR, MovieGenres.THRILLER],
        mood: 'intense',
        description: 'L\'orage appelle au suspense'
    },
    {
        weatherCode: 'Clouds',
        genres: [MovieGenres.DRAMA, MovieGenres.FANTASY, MovieGenres.MYSTERY],
        mood: 'rêveur',
        description: 'Les nuages nous invitent à l\'évasion'
    }
]; 