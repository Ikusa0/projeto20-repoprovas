import { Router } from "express";
import authRouter from "./authRouter";
import testRouter from "./testRouter";

const serverRouter = Router();

serverRouter.use(authRouter);
serverRouter.use(testRouter);

export default serverRouter;
