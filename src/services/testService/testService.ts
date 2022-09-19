import * as testRepository from "../../repositories/testRepository";
import { Test } from "../../repositories/testRepository";
import * as testValidation from "./testValidation";

export async function registerTest(test: Test) {
  await testValidation.ensureCategoryExists(test.categoryId);
  await testValidation.ensureTeachersDisciplinesExists(
    test.teacherDisciplineId
  );

  const id = await testRepository.registerTest(test);
  return id;
}

export async function getTestsByDisciplines() {
  const tests = await testRepository.getTestsByDisciplines();
  return tests;
}

export async function getTestsByTeachers() {
  const tests = await testRepository.getTestsByTeachers();
  return tests;
}
