import { Router } from 'express';

import * as testController from '../controllers/test';
import { validateSchema, validateToken } from '../middlewares';

const router = Router();

router.use(validateToken);
router.route('/').post(validateSchema('newTestSchema'), testController.createTest);

export default router;
