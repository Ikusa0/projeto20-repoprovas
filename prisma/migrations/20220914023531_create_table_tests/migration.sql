-- CreateTable
CREATE TABLE "Tests" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "teacherDisciplineId" INTEGER NOT NULL,

    CONSTRAINT "Tests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tests" ADD CONSTRAINT "Tests_teacherDisciplineId_fkey" FOREIGN KEY ("teacherDisciplineId") REFERENCES "TeachersDisciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
