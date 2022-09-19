import { Router } from "express";
import validateJoi from "../middlewares/joiMiddleware";
import * as testController from "../controllers/testController";
import { validateToken } from "../middlewares/tokenMiddleware";

const testRouter = Router();

testRouter.post(
  "/tests/register",
  validateToken,
  validateJoi("newTest"),
  testController.registerTest
);

testRouter.get(
  "/tests/disciplines",
  validateToken,
  testController.getTestsByDisciplines
);

testRouter.get(
  "/tests/teachers",
  validateToken,
  testController.getTestsByTeachers
);

export default testRouter;
