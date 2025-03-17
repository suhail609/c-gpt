// import { initTRPC } from "@trpc/server";
// import { z } from "zod";
// import {
//   saveConversation,
//   getConversationsByUser,
// } from "../services/conversation.service";
// import openai from "../config/openai";

// const t = initTRPC.create();

// export const appRouter = t.router({
//   chat: t.procedure
//     .input(z.object({ user: z.string(), message: z.string() }))
//     .mutation(async ({ input }) => {
//       const { user, message } = input;

//       // Get response from OpenAI
//       const response = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: message }],
//       });

//       const assistantReply =
//         response.choices[0].message?.content ||
//         "Sorry, I couldn't process that.";

//       // Save conversation
//       await saveConversation(user, [
//         { role: "user", content: message },
//         { role: "assistant", content: assistantReply },
//       ]);

//       return { response: assistantReply };
//     }),

//   getConversations: t.procedure
//     .input(z.object({ user: z.string() }))
//     .query(async ({ input }) => {
//       return await getConversationsByUser(input.user);
//     }),
// });

// export type AppRouter = typeof appRouter;

// import { router, procedure } from "./index";
// import { z } from "zod";
// import {
//   saveConversation,
//   getConversationsByUser,
// } from "../services/conversation.service";
// import openai from "../config/openai";

// export const appRouter = router({
//   chat: procedure
//     .input(z.object({ user: z.string(), message: z.string() }))
//     .mutation(async ({ input }) => {
//       const { user, message } = input;

//       // OpenAI API call
//       const response = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: message }],
//       });

//       const assistantReply =
//         response.choices[0].message?.content ||
//         "Sorry, I couldn't process that.";

//       // Save to DB
//       await saveConversation(user, [
//         { role: "user", content: message },
//         { role: "assistant", content: assistantReply },
//       ]);

//       return { response: assistantReply };
//     }),

//   getConversations: procedure
//     .input(z.object({ user: z.string() }))
//     .query(async ({ input }) => {
//       return await getConversationsByUser(input.user);
//     }),
// });

// export type AppRouter = typeof appRouter;

//TODO: separate different routes to different files for better organization and maintainability

import { router, procedure } from "../config/trpc"; // ✅ Import from config
import { z } from "zod";
import {
  saveConversation,
  getConversationsByUser,
} from "../services/conversation.service";
import openai from "../config/openai";

export const appRouter = router({
  chat: procedure
    .input(z.object({ user: z.string(), message: z.string() }))
    .mutation(async ({ input }) => {
      const { user, message } = input;

      // OpenAI API call
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      });

      const assistantReply =
        response.choices[0].message?.content ||
        "Sorry, I couldn't process that.";

      // Save to DB
      await saveConversation(user, [
        { role: "user", content: message },
        { role: "assistant", content: assistantReply },
      ]);

      return { response: assistantReply };
    }),

  getConversations: procedure
    .input(z.object({ user: z.string() }))
    .query(async ({ input }) => {
      return await getConversationsByUser(input.user);
    }),
});

//TODO: this is the same thing that has to import in the client
export type AppRouter = typeof appRouter;
