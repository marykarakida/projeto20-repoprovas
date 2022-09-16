/*
  Warnings:

  - You are about to drop the `_CategoryToTeacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DisciplineToTest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToTeacher" DROP CONSTRAINT "_CategoryToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToTeacher" DROP CONSTRAINT "_CategoryToTeacher_B_fkey";

-- DropForeignKey
ALTER TABLE "_DisciplineToTest" DROP CONSTRAINT "_DisciplineToTest_A_fkey";

-- DropForeignKey
ALTER TABLE "_DisciplineToTest" DROP CONSTRAINT "_DisciplineToTest_B_fkey";

-- AlterTable
ALTER TABLE "teachers" ADD COLUMN     "categoryId" INTEGER;

-- DropTable
DROP TABLE "_CategoryToTeacher";

-- DropTable
DROP TABLE "_DisciplineToTest";

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
