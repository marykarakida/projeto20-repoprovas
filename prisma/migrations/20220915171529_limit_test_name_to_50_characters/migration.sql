/*
  Warnings:

  - You are about to alter the column `name` on the `tests` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE "tests" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);
