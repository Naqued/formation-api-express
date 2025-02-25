"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const swagger_1 = require("./config/swagger");
// Configuration des variables d'environnement
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware pour parser le JSON
app.use(express_1.default.json());
// Logging des requêtes
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});
// Documentation Swagger
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.specs));
// Routes
app.use('/api/movies', movieRoutes_1.default);
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
