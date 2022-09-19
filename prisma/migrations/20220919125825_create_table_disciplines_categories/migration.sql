-- CreateTable
CREATE TABLE "DisciplinesCategories" (
    "id" SERIAL NOT NULL,
    "disciplineId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "DisciplinesCategories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DisciplinesCategories" ADD CONSTRAINT "DisciplinesCategories_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "Disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DisciplinesCategories" ADD CONSTRAINT "DisciplinesCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
