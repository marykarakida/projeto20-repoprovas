import { Request, Response } from 'express';

import * as testService from '../../services/test';

export async function getTestsGroupedByDiscipline(req: Request, res: Response) {
    const result = await testService.getTestsGroupedByDiscipline();

    res.status(200).send(result);
}
