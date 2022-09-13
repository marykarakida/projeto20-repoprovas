import { Router } from 'express';

import { register } from '../controllers/auth';
import { validateSchema } from '../middlewares';

const router = Router();

router.post('/register', validateSchema('newUserSchema'), register);

export default router;
