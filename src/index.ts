import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import movieRoutes from './routes/movieRoutes';
import { specs } from './config/swagger';
import cors from 'cors';

// Configuration des variables d'environnement
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Debug middleware to log CORS details
app.use((req, res, next) => {
    console.log('Incoming request:');
    console.log('Origin:', req.headers.origin);
    console.log('Method:', req.method);
    console.log('Headers:', req.headers);
    next();
});

// Ajout de CORS (doit être avant les routes)
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      callback(null, true);
      return;
    }
    
    if (origin === 'http://localhost:3000' || origin === 'http://localhost:3000/api-docs' || origin === 'http://localhost:3048') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));
app.options('*', cors());
// Middleware pour parser le JSON
app.use(express.json());

// Logging des requêtes
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status and metrics of the API
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Service health information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 service:
 *                   type: string
 *                   example: mood-movie-backend
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-03-15T12:00:00.000Z"
 *                 uptime:
 *                   type: number
 *                   example: 3600
 *                 memory:
 *                   type: object
 *                   properties:
 *                     heapTotal:
 *                       type: number
 *                       example: 34000000
 *                     heapUsed:
 *                       type: number
 *                       example: 20000000
 *                     rss:
 *                       type: number
 *                       example: 60000000
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 */

// Routes
app.use('/api/movies', movieRoutes);

// Route de statut pour le monitoring
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        service: 'mood-movie-backend',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.env.npm_package_version || '1.0.0'
    });
});

// Gestion des erreurs 404
app.use((req, res) => {
    console.error(`404 - Route non trouvée: ${req.method} ${req.url}`);
    res.status(404).json({
        error: 'Route non trouvée'
    });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
    console.log(`📝 Documentation API : http://localhost:${port}/api-docs`);
    console.log('📝 Routes disponibles :');
    console.log('   - GET /api/movies/recommend?city=<ville>');
    console.log('   - GET /api/health');
});