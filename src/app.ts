import cors from 'cors';
import express, { json } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import router from './routes/router';
import { errorHandler } from './middlewares';

import swaggerDocument from './swagger.json';

const app = express();

app.use(cors());
app.use(json());

app.use(router);
app.use(errorHandler);

// API DOCUMENTATION
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
