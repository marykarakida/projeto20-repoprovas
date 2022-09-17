import { Request, Response } from 'express';

import * as testService from '../../services/test';

export async function getTestsGroupedByTerm(req: Request, res: Response) {
    const result = await testService.getTestsGroupedByTerm();

    res.status(200).send(result);
}
