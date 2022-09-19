import supertest from "supertest";
import app from "../src/index";
import prisma from "../src/databases/prisma";
import * as authRepository from "../src/repositories/authRepository";
import {
  generateNewUser,
  insertNewUser,
  generateUser,
  insertUser,
} from "./factories/userFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "Users";`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /signup", () => {
  it("returns 201 for user created", async () => {
    const body = generateNewUser();
    const result = await supertest(app).post("/signup").send(body);
    const { status } = result;

    const userCreated = await authRepository.findUserByEmail(body.email);

    expect(status).toEqual(201);
    expect(userCreated).not.toBeNull();
  });

  it("returns 409 for user already created", async () => {
    const body = await insertNewUser();

    const result = await supertest(app).post("/signup").send(body);
    const { status } = result;

    expect(status).toEqual(409);
  });

  it("returns 422 for incomplete body", async () => {
    const body = generateUser();

    const result = await supertest(app).post("/signup").send(body);
    const { status } = result;

    const userCreated = await authRepository.findUserByEmail(body.email);

    expect(status).toEqual(422);
    expect(userCreated).toBeNull();
  });

  it("returns 422 for incorrect password", async () => {
    const body = generateNewUser({
      password: "12!23",
      confirmPassword: "12!23",
    });

    const result = await supertest(app).post("/signup").send(body);
    const { status } = result;

    const userCreated = await authRepository.findUserByEmail(body.email);

    expect(status).toEqual(422);
    expect(userCreated).toBeNull();
  });

  it("returns 422 for differences between password and confirmPassword", async () => {
    const body = generateNewUser({
      confirmPassword: "aaaaaaa",
    });

    const result = await supertest(app).post("/signup").send(body);
    const { status } = result;

    const userCreated = await authRepository.findUserByEmail(body.email);

    expect(status).toEqual(422);
    expect(userCreated).toBeNull();
  });
});

describe("POST /signin", () => {
  it("returns 200 for success in login", async () => {
    const body = await insertUser();

    const result = await supertest(app).post("/signin").send(body);
    const { status } = result;

    expect(status).toEqual(200);
  });

  it("returns 401 for invalid credentials", async () => {
    const body = generateUser();

    const result = await supertest(app).post("/signin").send(body);
    const { status } = result;

    expect(status).toEqual(401);
  });
});
