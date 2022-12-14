import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { router } from "./routes";
import "./shared/container";

import AppDataSource from "./database/dataSource";
import { AppError } from "./errors/AppError";

AppDataSource.initialize();

const app = express();

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Error interno do servidor - ${err.message}`,
    });
  }
);

app.listen(8080, () => console.log("Server is running"));
