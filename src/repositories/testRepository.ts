import { Test } from '@prisma/client';

import client from '../config/prisma';
import { TTestDetail } from '../types/testType';

export async function findTestByPdfUrl(pdfUrl: string): Promise<Test | null> {
    return client.test.findUnique({ where: { pdfUrl } });
}

export async function findTestsGroupedByTeacher() {
    return client.teacher.findMany({
        include: {
            categories: {
                select: {
                    id: true,
                    name: true,
                    tests: {
                        select: {
                            id: true,
                            name: true,
                            pdfUrl: true,
                            teacherDiscipline: { select: { teacherId: true, discipline: { select: { id: true, name: true } } } },
                        },
                        orderBy: { teacherDiscipline: { discipline: { name: 'asc' } } },
                    },
                },
                orderBy: { name: 'asc' },
            },
        },
        orderBy: { name: 'asc' },
    });
}

export async function findTestsGroupedByTerm() {
    return client.term.findMany({
        include: {
            disciplines: {
                select: {
                    id: true,
                    name: true,
                    categories: {
                        select: {
                            id: true,
                            name: true,
                            tests: {
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    teacherDiscipline: { select: { disciplineId: true, teacher: true } },
                                },
                                orderBy: { teacherDiscipline: { teacher: { name: 'asc' } } },
                            },
                        },
                        orderBy: { name: 'asc' },
                    },
                },
                orderBy: { name: 'asc' },
            },
        },
        orderBy: { number: 'asc' },
    });
}

export async function insertTest(pdfData: TTestDetail): Promise<void> {
    await client.test.create({ data: pdfData });
}
