import { Router } from 'express';

import authRouter from './authRouter';
import testRouter from './testRouter';

const router = Router();

router.use('/auth', authRouter);
router.use('/tests', testRouter);

export default router;
