import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
// import { appRouter } from "./trpc/router";
import connectDB from "./config/database";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import { createContext } from "./context";
import { appRouter } from "./routers";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
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
