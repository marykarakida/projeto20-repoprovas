import { Test } from '@prisma/client';

type TTestDetail = Omit<Test, 'id'>;
type TTestCreateDetail = Omit<Test, 'id' | 'teacherDisciplineId'>;

interface ITestCreateData extends TTestCreateDetail {
    teacherId: number;
    disciplineId: number;
}

export { TTestDetail, ITestCreateData };
