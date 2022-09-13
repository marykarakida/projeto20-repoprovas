import * as userRepository from '../../repositories/userRepository';
import { CustomError } from '../../middlewares/errorHandlerMiddleware';

export async function ensureNewUserisUnique(email: string): Promise<void> {
    const duplicatedUser = await userRepository.findUserByEmail(email);
    if (duplicatedUser) {
        throw CustomError('error_conflict', 'Bad Request');
    }
}
