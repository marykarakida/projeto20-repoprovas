import { Category } from '@prisma/client';

import client from '../config/prisma';

export async function findCategoryById(id: number): Promise<Category | null> {
    return client.category.findUnique({ where: { id } });
}
