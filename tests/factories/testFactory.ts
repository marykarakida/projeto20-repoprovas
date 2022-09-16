import { faker } from '@faker-js/faker';

import client from '../../src/config/prisma';
import { TTestDetail, ITestCreateData } from '../../src/types/testType';

type TOption = 'invalid-category' | 'valid';

export function createInsertTestData(option: TOption = 'valid', pdfUrl: string = 'new'): ITestCreateData {
    return {
        name: faker.lorem.sentence(5),
        pdfUrl: pdfUrl === 'new' ? faker.internet.url() : pdfUrl,
        categoryId: option === 'invalid-category' ? 10000 : 1,
        teacherId: 1,
        disciplineId: 1,
    };
}

export function createTest() {
    return {
        name: faker.lorem.sentence(5),
        pdfUrl: faker.internet.url(),
        categoryId: 1,
        teacherDisciplineId: 1,
    };
}

export async function insertTest(test: TTestDetail) {
    const insertedTest = await client.test.create({ data: test });

    return insertedTest;
}
