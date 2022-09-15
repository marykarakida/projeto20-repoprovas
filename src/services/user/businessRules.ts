import { User } from '@prisma/client';

import * as userRepository from '../../repositories/userRepository';
import { CustomError } from '../../middlewares/errorHandlerMiddleware';

export async function ensureNewUserisUnique(email: string): Promise<void> {
    const duplicatedUser = await userRepository.findUserByEmail(email);
    if (duplicatedUser) {
        throw CustomError('error_conflict', 'Bad Request');
    }
}

export async function ensureUserExists(email: string): Promise<User> {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw CustomError('error_not_found', 'Not Found');
    }

    return user;
}
