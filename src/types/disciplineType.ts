import { Category, Discipline } from '@prisma/client';

interface IDisciplinesCategory extends Discipline {
    categories: Category[];
}

export { IDisciplinesCategory };
