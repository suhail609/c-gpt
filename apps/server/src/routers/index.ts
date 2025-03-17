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
  // conversation: procedure
  //   .input(z.object({ user: z.string(), message: z.string() }))
  //   .mutation(async ({ input }) => {
  //     const { user, message } = input;

  //     const response = await openai.chat.completions.create({
  //       model: "gpt-3.5-turbo",
  //       messages: [{ role: "user", content: message }],
  //     });

  //     const assistantReply =
  //       response.choices[0].message?.content ||
  //       "Sorry, I couldn't process that.";

  //     await saveConversation(user, [
  //       { role: "user", content: message },
  //       { role: "assistant", content: assistantReply },
  //     ]);

  //     return { response: assistantReply };
  //   }),

  getConversations: procedure
    // .input(z.object({ user: z.string() }))
    .mutation(async ({ input }) => {
      console.log("get conversations api hited");
      // return await getConversationsByUser(input.user);
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
