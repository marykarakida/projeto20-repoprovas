import { Teacher } from '@prisma/client';

import * as teacherRepository from '../../repositories/teacherRepository';
import { CustomError } from '../../middlewares';

export async function ensureTeacherExists(teacherId: number): Promise<Teacher> {
    const teacher = await teacherRepository.findTeacherById(teacherId);

    if (!teacher) {
        throw CustomError('error_not_found', 'This instructor does not exist');
    }

    return teacher;
}
