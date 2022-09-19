import { TeachersDisciplines } from "@prisma/client";
import db from "../databases/prisma";

export type TeacherDiscipline = Omit<TeachersDisciplines, "id">;

export function findById(id: number): Promise<TeachersDisciplines | null> {
  return db.teachersDisciplines.findUnique({ where: { id } });
}
