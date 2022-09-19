import { CustomError } from "../../entities/customError";
import * as categoryRepository from "../../repositories/categoryRepository";
import * as teachersDisciplinesRepository from "../../repositories/teachersDisciplinesRepository";

export async function ensureCategoryExists(categoryId: number) {
  const category = await categoryRepository.findById(categoryId);
  if (!category) {
    throw new CustomError({
      type: "error_not_found",
      message: "Invalid category ID",
    });
  }
}

export async function ensureTeachersDisciplinesExists(
  teachersDisciplinesId: number
) {
  const teachersDisciplines = await teachersDisciplinesRepository.findById(
    teachersDisciplinesId
  );
  if (!teachersDisciplines) {
    throw new CustomError({
      type: "error_not_found",
      message: "Invalid TeachersDisciplines ID",
    });
  }
}
