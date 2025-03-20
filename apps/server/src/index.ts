import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import connectDB from "./config/database.config";
import { appRouter } from "./routes";
import { createContext } from "./middlewares/context.middleware";
import { SERVER_PORT } from "./config/env.config";

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/trpc",
  createExpressMiddleware({ router: appRouter, createContext: createContext })
);

connectDB();

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
