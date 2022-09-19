import prisma from "../src/databases/prisma";

async function main() {
  await prisma.$queryRaw`TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE;`;
  await prisma.$queryRaw`TRUNCATE TABLE "Terms" RESTART IDENTITY CASCADE;`;
  await prisma.$queryRaw`TRUNCATE TABLE "Disciplines" RESTART IDENTITY CASCADE;`;
  await prisma.$queryRaw`TRUNCATE TABLE "Teachers" RESTART IDENTITY CASCADE;`;
  await prisma.$queryRaw`TRUNCATE TABLE "TeachersDisciplines" RESTART IDENTITY CASCADE;`;
  await prisma.$queryRaw`TRUNCATE TABLE "DisciplinesCategories" RESTART IDENTITY CASCADE;`;
  await prisma.$queryRaw`TRUNCATE TABLE "Categories" RESTART IDENTITY CASCADE;`;
  await prisma.$queryRaw`TRUNCATE TABLE "Tests" RESTART IDENTITY CASCADE;`;

  await prisma.terms.createMany({
    data: [
      { number: 1 },
      { number: 2 },
      { number: 3 },
      { number: 4 },
      { number: 5 },
      { number: 6 },
    ],
  });

  await prisma.categories.createMany({
    data: [{ name: "Projeto" }, { name: "Prática" }, { name: "Recuperação" }],
  });

  await prisma.teachers.createMany({
    data: [{ name: "Diego Pinho" }, { name: "Bruna Hamori" }],
  });

  await prisma.disciplines.createMany({
    data: [
      { name: "HTML e CSS", termId: 1 },
      { name: "JavaScript", termId: 2 },
      { name: "React", termId: 3 },
      { name: "Humildade", termId: 1 },
      { name: "Planejamento", termId: 2 },
      { name: "Autoconfiança", termId: 3 },
    ],
  });

  await prisma.teachersDisciplines.createMany({
    data: [
      { teacherId: 1, disciplineId: 1 },
      { teacherId: 1, disciplineId: 2 },
      { teacherId: 1, disciplineId: 3 },
      { teacherId: 2, disciplineId: 4 },
      { teacherId: 2, disciplineId: 5 },
      { teacherId: 2, disciplineId: 6 },
    ],
  });

  await prisma.disciplinesCategories.createMany({
    data: [
      { disciplineId: 1, categoryId: 1 },
      { disciplineId: 1, categoryId: 2 },
      { disciplineId: 1, categoryId: 3 },
      { disciplineId: 2, categoryId: 1 },
      { disciplineId: 2, categoryId: 2 },
      { disciplineId: 2, categoryId: 3 },
      { disciplineId: 3, categoryId: 1 },
      { disciplineId: 3, categoryId: 2 },
      { disciplineId: 3, categoryId: 3 },
      { disciplineId: 4, categoryId: 1 },
      { disciplineId: 4, categoryId: 2 },
      { disciplineId: 4, categoryId: 3 },
      { disciplineId: 5, categoryId: 1 },
      { disciplineId: 5, categoryId: 2 },
      { disciplineId: 5, categoryId: 3 },
      { disciplineId: 6, categoryId: 1 },
      { disciplineId: 6, categoryId: 2 },
      { disciplineId: 6, categoryId: 3 },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
