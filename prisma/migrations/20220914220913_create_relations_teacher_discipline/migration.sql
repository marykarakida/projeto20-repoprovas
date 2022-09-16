-- CreateTable
CREATE TABLE "_DisciplineToTeacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DisciplineToTeacher_AB_unique" ON "_DisciplineToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_DisciplineToTeacher_B_index" ON "_DisciplineToTeacher"("B");

-- AddForeignKey
ALTER TABLE "_DisciplineToTeacher" ADD CONSTRAINT "_DisciplineToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DisciplineToTeacher" ADD CONSTRAINT "_DisciplineToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
