import * as userRepository from '../../repositories/userRepository';

import * as businessRules from './businessRules';
import { TUserDetail } from '../../types/userType';
import { hashPassword } from '../../utils/encryptUtils';

export async function register(userData: TUserDetail): Promise<void> {
    const { email, password } = userData;

    await businessRules.ensureNewUserisUnique(email);

    const hashedPassword = await hashPassword(password);

    await userRepository.insertUser({ email, password: hashedPassword });
}
