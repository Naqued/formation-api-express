import { Router, Request, Response, RequestHandler } from 'express';
import { TMDBService } from '../services/tmdbService';

const router = Router();
const tmdbService = new TMDBService();

// Search movies
router.get('/search', (async (req: Request, res: Response) => {
    try {
        const query = req.query.query as string;
        const page = req.query.page ? parseInt(req.query.page as string) : 1;

        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        const movies = await tmdbService.searchMovies(query, page);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
}) as RequestHandler);

// Get movies by genre
router.get('/genre/:genreId', (async (req: Request, res: Response) => {
    try {
        const genreId = parseInt(req.params.genreId);
        const page = req.query.page ? parseInt(req.query.page as string) : 1;

        const movies = await tmdbService.getMoviesByGenre(genreId, page);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
}) as RequestHandler);

// Get movie details
router.get('/:movieId', (async (req: Request, res: Response) => {
    try {
        const movieId = parseInt(req.params.movieId);
        const movie = await tmdbService.getMovieDetails(movieId);
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
}) as RequestHandler);

export default router; 