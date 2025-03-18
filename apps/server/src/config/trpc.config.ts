import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { createContext } from "../middlewares/context.middleware";

// import { createContext } from "../context";

// Initialize tRPC
// const t = initTRPC.create();
const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create();

//TODO: since this file is using createContext and middleware is being used in createContext file check if this will cause circular dependency
// Export reusable utilities
export const router = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;
