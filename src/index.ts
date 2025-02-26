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

// Ajout de CORS (doit être avant les routes)
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Middleware pour parser le JSON
app.use(express.json());

// Logging des requêtes
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/movies', movieRoutes);

// Route de statut pour le monitoring
app.get('/status', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date(),
        uptime: process.uptime()
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
    console.log('   - GET /status');
});