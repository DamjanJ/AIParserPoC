import express from 'express';
import parsingRoutes from './routes/parsingRoutes'

const app = express();

app.use(express.json());
app.use('/api', parsingRoutes); 

export default app;