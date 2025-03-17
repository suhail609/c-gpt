import { router, procedure } from "../config/trpc";
import { z } from "zod";
import {
  saveConversation,
  getConversationsByUser,
} from "../services/conversation.service";
import openai from "../config/openai";
import { chatRouter } from "./chat";
import { authRouter } from "./auth.route";

export const appRouter = router({
  test: procedure.mutation(async ({ input }) => {
    console.log("test is working");
  }),

  chat: chatRouter,
  auth: authRouter,
});

//TODO: this is the same thing that has to import in the client
export type AppRouter = typeof appRouter;

/*
    info: you can merge routers to same level using so both will be on the main route
    const mergedRouter = t.mergeRouter(appRouter, chatRouter)
    and export and use that instead of AppRouter 
*/
