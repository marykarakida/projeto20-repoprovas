import cors from 'cors';
import dotenv from 'dotenv';
import express, { json } from 'express';
import 'express-async-errors';

import router from './routes/router';
import { errorHandler } from './middlewares';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(router);
app.use(errorHandler);

const PORT: number = Number(process.env.PORT) || 4000;

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server running on port', PORT);
});
