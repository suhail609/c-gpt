import { router } from "../config/trpc.config";
import { authRouter } from "./auth.route";
import { chatRouter } from "./chat.route";

export const appRouter = router({
  chat: chatRouter,
  auth: authRouter,
});

//NOTE: this is the same thing that has to import in the client
export type AppRouter = typeof appRouter;

/*
    info: you can merge routers to same level using so both will be on the main route
    const mergedRouter = t.mergeRouter(appRouter, chatRouter)
    and export and use that instead of AppRouter 
*/
