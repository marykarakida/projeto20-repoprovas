import { faker } from '@faker-js/faker';

import client from '../../src/config/prisma';
import { TUserDetail } from '../../src/types/userType';
import { hashPassword } from '../../src/utils/encryptUtils';

type TOption = 'invalid-email' | 'invalid-pwd' | 'valid';

export function createUser(option: TOption = 'valid') {
    return {
        email: option === 'invalid-email' ? 'wrongemail@com.br' : faker.internet.email(),
        password: option === 'invalid-pwd' ? 'wrongpwd' : 'R1ghtP@ssword',
    };
}

export async function insertUser(user: TUserDetail) {
    const hashedPassword = await hashPassword(user.password);
    const insertedUser = await client.user.create({ data: { email: user.email, password: hashedPassword } });

    return insertedUser;
}
