import { Router } from 'express';

import * as testController from '../controllers/test';
import { validateSchema, validateToken } from '../middlewares';

const router = Router();

router.use(validateToken);
router.route('/').post(validateSchema('newTestSchema'), testController.createTest);
router.route('/terms').get(testController.getTestsGroupedByTerm);
router.route('/teachers').get(testController.getTestsGroupedByTeacher);

export default router;
