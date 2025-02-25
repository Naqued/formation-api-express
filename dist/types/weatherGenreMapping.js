"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherToGenreMap = exports.MovieGenres = void 0;
/**
 * Genre IDs from TMDB API
 * @see https://developers.themoviedb.org/3/genres/get-movie-list
 */
var MovieGenres;
(function (MovieGenres) {
    MovieGenres[MovieGenres["ACTION"] = 28] = "ACTION";
    MovieGenres[MovieGenres["ADVENTURE"] = 12] = "ADVENTURE";
    MovieGenres[MovieGenres["ANIMATION"] = 16] = "ANIMATION";
    MovieGenres[MovieGenres["COMEDY"] = 35] = "COMEDY";
    MovieGenres[MovieGenres["DRAMA"] = 18] = "DRAMA";
    MovieGenres[MovieGenres["FANTASY"] = 14] = "FANTASY";
    MovieGenres[MovieGenres["HORROR"] = 27] = "HORROR";
    MovieGenres[MovieGenres["ROMANCE"] = 10749] = "ROMANCE";
    MovieGenres[MovieGenres["THRILLER"] = 53] = "THRILLER";
    MovieGenres[MovieGenres["SCIENCE_FICTION"] = 878] = "SCIENCE_FICTION";
    MovieGenres[MovieGenres["MYSTERY"] = 9648] = "MYSTERY";
    MovieGenres[MovieGenres["FAMILY"] = 10751] = "FAMILY";
})(MovieGenres || (exports.MovieGenres = MovieGenres = {}));
/**
 * Mapping between weather conditions and movie genres
 */
exports.weatherToGenreMap = [
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
