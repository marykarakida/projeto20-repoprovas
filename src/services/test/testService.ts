import * as businessRules from './businessRules';
import * as categoryService from '../category';
import * as disciplineService from '../discipline';
import * as teacherService from '../teacher';
import * as teacherDisciplineService from '../teacherDiscipline';
import * as testRepository from '../../repositories/testRepository';

import { ITestCreateData } from '../../types/testType';

export async function createTest(testData: ITestCreateData): Promise<void> {
    const { name, pdfUrl, categoryId, teacherId, disciplineId } = testData;

    await businessRules.ensurePdfUrlIsUnique(pdfUrl);
    await categoryService.ensureCategoryExists(categoryId);
    await teacherService.ensureTeacherExists(teacherId);
    await disciplineService.ensureDisciplineExists(disciplineId);
    await disciplineService.ensureDisciplineHasTestCategory(disciplineId, categoryId);
    const relation = await teacherDisciplineService.ensureTeacherDisciplineRelationExists(teacherId, disciplineId);

    await testRepository.insertTest({ name, pdfUrl, categoryId, teacherDisciplineId: relation.id });
}

export async function getTestsGroupedByTeacher() {
    const testsGroupedByTeacher = await testRepository.findTestsGroupedByTeacher();

    console.log(testsGroupedByTeacher);
    const result = testsGroupedByTeacher.map(({ id, categories, ...rest }) => ({
        ...rest,
        categories: categories.map(({ tests, ...rest }) => ({
            ...rest,
            tests: tests
                .filter(({ teacherDiscipline: { teacherId } }) => teacherId === id)
                .map(({ teacherDiscipline: { discipline }, ...rest }) => ({ ...rest, discipline })),
        })),
    }));

    return result;
}

export async function getTestsGroupedByTerm() {
    const testsGroupedByTerm = await testRepository.findTestsGroupedByTerm();

    const result = testsGroupedByTerm.map(({ disciplines, ...rest }) => ({
        ...rest,
        disciplines: disciplines.map(({ id, name, categories }) => ({
            id,
            name,
            categories: categories.map(({ tests, ...rest }) => ({
                ...rest,
                tests: tests
                    .filter(({ teacherDiscipline: { disciplineId } }) => disciplineId === id)
                    .map(({ teacherDiscipline: { ...teacher }, name, pdfUrl }) => ({ name, pdfUrl, teacher })),
            })),
        })),
    }));

    return result;
}
