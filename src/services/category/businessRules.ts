import { Category } from '@prisma/client';

import * as categoryRepository from '../../repositories/categoryRepository';
import { CustomError } from '../../middlewares';

export async function ensureCategoryExists(categoryId: number): Promise<Category> {
    const category = await categoryRepository.findCategoryById(categoryId);

    if (!category) {
        throw CustomError('error_not_found', 'This category does not exist');
    }

    return category;
}
