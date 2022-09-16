import { Discipline } from '@prisma/client';

import * as disciplineRepository from '../../repositories/disciplineRepository';
import { CustomError } from '../../middlewares';

export async function ensureDisciplineExists(disciplineId: number): Promise<Discipline> {
    const discipline = await disciplineRepository.findDisciplineById(disciplineId);

    if (!discipline) {
        throw CustomError('error_not_found', 'This discipline does not exist');
    }

    return discipline;
}

export async function ensureDisciplineHasTestCategory(disciplineId: number, categoryId: number) {
    const discipline = await disciplineRepository.findDisciplineTestsCategoriesById(disciplineId);

    if (!discipline?.categories.some((category) => category.id === categoryId)) {
        throw CustomError('error_not_found', 'This discipline does not give tests in this category');
    }
}
