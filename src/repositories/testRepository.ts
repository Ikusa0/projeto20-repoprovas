/* eslint-disable no-param-reassign */
import { Tests } from "@prisma/client";
import db from "../databases/prisma";

export type Test = Omit<Tests, "id">;

export async function registerTest(test: Test) {
  await db.tests.create({ data: test });
}

export async function getTestsByDisciplines() {
  const tests = await db.terms.findMany({
    where: {},
    select: {
      number: true,
      Disciplines: {
        select: {
          name: true,
          DisciplinesCategories: {
            select: {
              category: {
                select: {
                  name: true,
                  Tests: {
                    select: {
                      name: true,
                      teacherDiscipline: {
                        select: { teacher: { select: { name: true } } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  tests.forEach((term: any) => {
    term.disciplines = term.Disciplines;
    delete term.Disciplines;
    term.disciplines.forEach((discipline: any) => {
      discipline.categories = discipline.DisciplinesCategories;
      delete discipline.DisciplinesCategories;
      discipline.categories.forEach((category: any) => {
        category.name = category.category.name;
        category.tests = category.category.Tests;
        delete category.category;
        category.tests.forEach((test: any) => {
          test.teacher = test.teacherDiscipline.teacher;
          delete test.teacherDiscipline;
        });
      });
    });
  });

  return { terms: tests };
}

export async function getTestsByTeachers() {
  const tests = await db.teachers.findMany({
    where: {},
    select: {
      name: true,
      TeachersDisciplines: {
        select: {
          Tests: { select: { name: true } },
          discipline: { select: { name: true } },
        },
      },
    },
  });

  tests.forEach((teacher: any) => {
    teacher.tests = [];
    teacher.TeachersDisciplines.forEach((t: any) => {
      t.Tests.forEach((test: any) => {
        test.discipline = t.discipline.name;
      });
      teacher.tests = teacher.tests.concat(t.Tests);
    });
    delete teacher.TeachersDisciplines;
  });

  return { teachers: tests };
}
