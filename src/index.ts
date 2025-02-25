import express from 'express';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weatherRoutes';
import movieRoutes from './routes/movieRoutes';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Weather routes
app.use('/api', weatherRoutes);

// Movie routes
app.use('/api/movies', movieRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});