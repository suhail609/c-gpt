import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import connectDB from "./config/database.config";
import dotenv from "dotenv";
import { appRouter } from "./routes";
import { createContext } from "./middlewares/context.middleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/trpc",
  createExpressMiddleware({ router: appRouter, createContext: createContext })
);

connectDB();

const PORT = process.env.PORT || 5000;
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
