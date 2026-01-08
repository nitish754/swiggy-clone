import 'dotenv/config';
import express, { Application } from 'express';
import router from './routes/index';
import { handleError } from './shared/middleware/handleError';

const app: Application = express();

app.use(express.json());

app.use('/api', router);

app.use(handleError);

export default app;
