import { Teacher } from '@prisma/client';

import client from '../config/prisma';

export async function findTeacherById(id: number): Promise<Teacher | null> {
    return client.teacher.findUnique({ where: { id } });
}
