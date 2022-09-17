import { Request, Response } from 'express';

import * as testService from '../../services/test';

export async function getTestsGroupedByTeacher(req: Request, res: Response) {
    const result = await testService.getTestsGroupedByTeacher();

    res.status(200).send(result);
}
