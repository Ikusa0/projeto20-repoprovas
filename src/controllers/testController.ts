import { Request, Response } from "express";
import { Test } from "../repositories/testRepository";
import * as testService from "../services/testService/testService";

export async function registerTest(req: Request, res: Response) {
  const test: Test = req.body;

  const id = await testService.registerTest(test);

  res.status(201).send({ id });
}

export async function getTestsByDisciplines(req: Request, res: Response) {
  const tests = await testService.getTestsByDisciplines();
  res.send(tests);
}

export async function getTestsByTeachers(req: Request, res: Response) {
  const tests = await testService.getTestsByTeachers();
  res.send(tests);
}
