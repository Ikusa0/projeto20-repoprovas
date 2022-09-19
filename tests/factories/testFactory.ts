import { Test } from "../../src/repositories/testRepository";

export function generateNewTest(test?: Partial<Test>): Test {
  return {
    name: test?.name || "NomeMassa",
    pdfUrl: test?.pdfUrl || "https://google.com.br",
    categoryId: test?.categoryId || 1,
    teacherDisciplineId: test?.teacherDisciplineId || 1,
  };
}
