/*
  Warnings:

  - You are about to drop the column `categoryId` on the `teachers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_categoryId_fkey";

-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "categoryId";
