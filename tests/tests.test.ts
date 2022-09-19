import supertest from "supertest";
import app from "../src/index";
import prisma from "../src/databases/prisma";
import * as testRepository from "../src/repositories/testRepository";
import { generateNewTest } from "./factories/testFactory";
import { insertUser } from "./factories/userFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "Tests";`;
  await prisma.$executeRaw`TRUNCATE TABLE "Users";`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /tests/register", () => {
  it("returns 201 for test created", async () => {
    const user = await insertUser();
    const {
      body: { token },
    } = await supertest(app).post("/signin").send(user);
    const body = generateNewTest();
    const result = await supertest(app)
      .post("/tests/register")
      .send(body)
      .set({ Authorization: `Bearer ${token}` });
    const { status } = result;

    const testCreated = await testRepository.findById(Number(result.body.id));

    expect(status).toEqual(201);
    expect(testCreated).not.toBeNull();
  });

  it("returns 404 for inexistent categoryId", async () => {
    const user = await insertUser();
    const {
      body: { token },
    } = await supertest(app).post("/signin").send(user);
    const body = generateNewTest({ categoryId: 20 });
    const result = await supertest(app)
      .post("/tests/register")
      .send(body)
      .set({ Authorization: `Bearer ${token}` });
    const { status } = result;

    expect(status).toEqual(404);
  });

  it("returns 404 for inexistent teacherDisciplineId", async () => {
    const user = await insertUser();
    const {
      body: { token },
    } = await supertest(app).post("/signin").send(user);
    const body = generateNewTest({ teacherDisciplineId: 20 });
    const result = await supertest(app)
      .post("/tests/register")
      .send(body)
      .set({ Authorization: `Bearer ${token}` });
    const { status } = result;

    expect(status).toEqual(404);
  });

  it("returns 422 for incorrect body format", async () => {
    const user = await insertUser();
    const {
      body: { token },
    } = await supertest(app).post("/signin").send(user);
    const body = generateNewTest();
    const result = await supertest(app)
      .post("/tests/register")
      .send({ name: body.name })
      .set({ Authorization: `Bearer ${token}` });
    const { status } = result;

    expect(status).toEqual(422);
  });
});

describe("GET /tests/disciplines", () => {
  it("returns 200 when success", async () => {
    const user = await insertUser();
    const {
      body: { token },
    } = await supertest(app).post("/signin").send(user);
    const result = await supertest(app)
      .get("/tests/disciplines")
      .set({ Authorization: `Bearer ${token}` });
    const { status } = result;

    expect(status).toEqual(200);
    expect(result.body).toBeInstanceOf(Object);
  });
});

describe("GET /tests/teachers", () => {
  it("returns 200 when success", async () => {
    const user = await insertUser();
    const {
      body: { token },
    } = await supertest(app).post("/signin").send(user);
    const result = await supertest(app)
      .get("/tests/disciplines")
      .set({ Authorization: `Bearer ${token}` });
    const { status } = result;

    expect(status).toEqual(200);
    expect(result.body).toBeInstanceOf(Object);
  });
});
