import { Test } from '@prisma/client';

import client from '../config/prisma';
import { TTestDetail } from '../types/testType';

export async function findTestByPdfUrl(pdfUrl: string): Promise<Test | null> {
    return client.test.findUnique({ where: { pdfUrl } });
}

export async function insertTest(pdfData: TTestDetail): Promise<void> {
    await client.test.create({ data: pdfData });
}
