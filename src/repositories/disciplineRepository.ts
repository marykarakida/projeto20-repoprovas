import { Discipline } from '@prisma/client';

import client from '../config/prisma';
import { IDisciplinesCategory } from '../types/disciplineType';

export async function findDisciplineById(id: number): Promise<Discipline | null> {
    return client.discipline.findUnique({ where: { id } });
}

export async function findDisciplineTestsCategoriesById(id: number): Promise<IDisciplinesCategory | null> {
    return client.discipline.findUnique({ where: { id }, include: { categories: true } });
}
