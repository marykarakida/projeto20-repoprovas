import { TeacherDiscipline } from '@prisma/client';

import client from '../config/prisma';

export async function findTeacherDiscipline(teacherId: number, disciplineId: number): Promise<TeacherDiscipline | null> {
    return client.teacherDiscipline.findUnique({ where: { teacherId_disciplineId: { teacherId, disciplineId } } });
}
