import { Test } from '@prisma/client';

import client from '../config/prisma';
import { TTestDetail } from '../types/testType';

export async function findTestByPdfUrl(pdfUrl: string): Promise<Test | null> {
    return client.test.findUnique({ where: { pdfUrl } });
}

export async function findTests() {
    const result = await client.test.findMany({
        select: {
            id: true,
            name: true,
            pdfUrl: true,
            category: true,
            teacherDiscipline: { select: { discipline: { select: { id: true, name: true, term: true } }, teacher: true } },
        },
        orderBy: { id: 'asc' },
    });

    const filteredResult = result.map(({ teacherDiscipline, ...rest }) => ({
        ...rest,
        discipline: teacherDiscipline.discipline,
        teacher: teacherDiscipline.teacher,
    }));

    return filteredResult;
}

export async function findTestsGroupedByTeacher() {
    const result = await client.teacher.findMany({
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

    const filteredResult = result.map(({ id, categories, ...rest }) => ({
        ...rest,
        categories: categories
            .map(({ tests, ...rest }) => ({
                ...rest,
                tests: tests
                    .filter(({ teacherDiscipline: { teacherId } }) => teacherId === id)
                    .map(({ teacherDiscipline: { discipline }, ...rest }) => ({ ...rest, discipline })),
            }))
            .filter(({ tests }) => tests.length > 0),
    }));

    return filteredResult;
}

export async function findTestsGroupedByDiscipline() {
    const result = await client.term.findMany({
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

    const filteredResult = result.map(({ disciplines, ...rest }) => ({
        ...rest,
        disciplines: disciplines.map(({ id, categories, ...rest }) => ({
            ...rest,
            categories: categories
                .map(({ tests, ...rest }) => ({
                    ...rest,
                    tests: tests
                        .filter(({ teacherDiscipline: { disciplineId } }) => disciplineId === id)
                        .map(({ teacherDiscipline: { teacher }, ...rest }) => ({ ...rest, teacher })),
                }))
                .filter(({ tests }) => tests.length > 0),
        })),
    }));

    return filteredResult;
}

export async function insertTest(pdfData: TTestDetail): Promise<void> {
    await client.test.create({ data: pdfData });
}
