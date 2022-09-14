import * as userRepository from '../../repositories/userRepository';
import { CustomError } from '../../middlewares/errorHandlerMiddleware';

import * as businessRules from './businessRules';
import { TUserDetail } from '../../types/userType';
import { hashPassword, validatePassword } from '../../utils/encryptUtils';
import { generateToken } from '../../utils/jwtUtils';

export async function register(userData: TUserDetail): Promise<void> {
    const { email, password } = userData;

    await businessRules.ensureNewUserisUnique(email);

    const hashedPassword = await hashPassword(password);

    await userRepository.insertUser({ email, password: hashedPassword });
}

export async function login(userData: TUserDetail): Promise<string> {
    const { email, password } = userData;

    const user = await businessRules.ensureUserExists(email);

    if (!validatePassword(password, user.password)) {
        throw CustomError('error_bad_request', 'Cannot create session');
    }

    const token = generateToken({ id: user.id });

    return token;
}