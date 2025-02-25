import express from 'express';
import dotenv from 'dotenv';
import movieRoutes from './routes/movieRoutes';

// Configuration des variables d'environnement
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

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
    console.log('📝 Routes disponibles :');
    console.log('   - GET /api/movies/recommend?city=<ville>');
});