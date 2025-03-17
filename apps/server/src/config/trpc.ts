import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { createContext } from "../context";
// Initialize tRPC
// const t = initTRPC.create();
const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create();

// Export reusable utilities
export const router = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;
