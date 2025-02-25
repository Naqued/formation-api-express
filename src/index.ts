import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import movieRoutes from './routes/movieRoutes';
import { specs } from './config/swagger';

// Configuration des variables d'environnement
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/movies', movieRoutes);

// Gestion des erreurs 404 pour les routes non trouvées
app.use((req, res) => {
    res.status(404).json({
        error: 'Route non trouvée'
    });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
    console.log('📝 Documentation API : http://localhost:${port}/api-docs');
    console.log('📝 Routes disponibles :');
    console.log('   - GET /api/movies/recommend?city=<ville>');
});