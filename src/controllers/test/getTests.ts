import { Request, Response } from 'express';

import * as testService from '../../services/test';

const groupedByList = ['disciplines', 'teachers'];

export async function getTests(req: Request, res: Response) {
    const { groupedBy } = req.query;

    if (groupedBy && !groupedByList.includes(groupedBy as string)) {
        return res.status(422).send('Cannot group tests by specified group');
    }

    if (groupedBy === 'disciplines') {
        const result = await testService.getTestsGroupedByDiscipline();
        return res.status(200).send(result);
    }

    if (groupedBy === 'teachers') {
        const result = await testService.getTestsGroupedByTeacher();
        return res.status(200).send(result);
    }

    const result = await testService.getTests();
    return res.status(200).send(result);
}
