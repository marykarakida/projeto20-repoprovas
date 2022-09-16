import { Request, Response } from 'express';

import * as testService from '../../services/test';

import { ITestCreateData } from '../../types/testType';

export async function createTest(req: Request<{}, {}, ITestCreateData>, res: Response) {
    const { name, pdfUrl, categoryId, teacherId, disciplineId } = req.body;

    await testService.createTest({ name, pdfUrl, categoryId, teacherId, disciplineId });

    res.status(201).send();
}
