import client from '../config/prisma';

import { User, TUserDetail } from '../types/userType';

export async function findUserByEmail(email: string): Promise<User | null> {
    return client.user.findUnique({ where: { email } });
}

export async function insertUser(userData: TUserDetail): Promise<void> {
    await client.user.create({ data: { ...userData } });
}
