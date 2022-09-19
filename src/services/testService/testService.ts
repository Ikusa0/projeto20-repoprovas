import * as testRepository from "../../repositories/testRepository";
import { Test } from "../../repositories/testRepository";

export async function registerTest(test: Test) {
  await testRepository.registerTest(test);
}

export async function getTestsByDisciplines() {
  const tests = await testRepository.getTestsByDisciplines();
  return tests;
}

export async function getTestsByTeachers() {
  const tests = await testRepository.getTestsByTeachers();
  return tests;
}
