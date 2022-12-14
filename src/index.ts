import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import { errorHandler } from "./middlewares/errorHandler";
import serverRouter from "./routes/serverRouter";

dotenv.config();

const app = express();
app.use(cors(), json());

app.use(serverRouter);
app.use(errorHandler);

export default app;
