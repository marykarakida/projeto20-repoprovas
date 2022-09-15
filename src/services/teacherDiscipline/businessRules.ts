import { TeacherDiscipline } from '@prisma/client';

import * as teacherDisciplineRepository from '../../repositories/teacherDisciplineRepository';
import { CustomError } from '../../middlewares';

export async function ensureTeacherDisciplineRelationExists(teacherId: number, disciplineId: number): Promise<TeacherDiscipline> {
    const relation = await teacherDisciplineRepository.findTeacherDiscipline(teacherId, disciplineId);

    if (!relation) {
        throw CustomError('error_not_found', 'This instructor does not teach this discipline');
    }

    return relation;
}
