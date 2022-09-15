/*
  Warnings:

  - A unique constraint covering the columns `[teacherId,disciplineId]` on the table `teachersDisciplines` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "teachersDisciplines_teacherId_disciplineId_key" ON "teachersDisciplines"("teacherId", "disciplineId");
