import express from "express";
import { ZodError } from "zod";
import morgan from "morgan";
import cors from "cors";
import { ENV } from "@config/env";
import { registerDependencies } from "./injection/di";
import http from "http";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = ENV.HTTP_PORT ?? 5500;

app.use(morgan("dev"));
app.use(cors());

app.use(
  async (
    err: unknown,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<express.Response | void> => {
    if (err instanceof ZodError) {
      console.warn(`Caught Validation Error for ${req.path}`);
      return res.status(400).json({
        message: "Validation Failed",
        details: JSON.parse(err?.message),
      });
    } else {
      console.log(err);

      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);


export const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});

server.on("error", (e) => {
  console.error("Error occurred while starting the server", e);
});

registerDependencies(server);

