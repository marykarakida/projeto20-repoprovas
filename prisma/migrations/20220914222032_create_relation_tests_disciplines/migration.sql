-- CreateTable
CREATE TABLE "_DisciplineToTest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DisciplineToTest_AB_unique" ON "_DisciplineToTest"("A", "B");

-- CreateIndex
CREATE INDEX "_DisciplineToTest_B_index" ON "_DisciplineToTest"("B");

-- AddForeignKey
ALTER TABLE "_DisciplineToTest" ADD CONSTRAINT "_DisciplineToTest_A_fkey" FOREIGN KEY ("A") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DisciplineToTest" ADD CONSTRAINT "_DisciplineToTest_B_fkey" FOREIGN KEY ("B") REFERENCES "tests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
