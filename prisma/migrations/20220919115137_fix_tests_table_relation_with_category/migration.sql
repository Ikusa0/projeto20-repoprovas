-- AddForeignKey
ALTER TABLE "Tests" ADD CONSTRAINT "Tests_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
