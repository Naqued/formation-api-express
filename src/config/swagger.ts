import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Movie Mood API',
            version: '1.0.0',
            description: 'API de recommandation de films basée sur la météo',
            contact: {
                name: 'Support API',
                email: 'support@moviemood.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Serveur de développement'
            }
        ]
    },
    apis: ['./src/routes/*.ts', './src/types/*.ts'] // Fichiers à scanner pour la documentation
};

export const specs = swaggerJsdoc(swaggerOptions); 