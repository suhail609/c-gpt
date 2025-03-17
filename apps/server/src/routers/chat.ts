import { router, procedure } from "../config/trpc";
import { z } from "zod";
import {
  saveConversation,
  getConversationsByUser,
} from "../services/conversation.service";
import openai from "../config/openai";
import { isAuthorizedUserProcedure } from "../middleware/auth.middleware";
import { getUserChats, sendMessage } from "../services/chat.service";

/**
 * PROCEDURES:
 * you you use reusable procedures to avoid code duplication and improve readability.
 * example:
 * const user procedure = t.procedure.input(v=>{
 * if(typeof v === "string") return v
 * throw new Error("Invalid user input")})
 * and use that procured in multiple routes like inheritance
 *
 * TYPES FOR OUTPUT: you can use .output after .input where you can validate the output of the response will be and it will be useful for type inference
 */

export const chatRouter = router({
  createChat: isAuthorizedUserProcedure
    .input(z.object({ user: z.string(), message: z.string() }))
    // .mutation((req) => req.ctx)
    .mutation((req) => {
      /**
       * create a new entry to chat collection with userId and message
       * ask chatgpt for the response
       * save the response to the collection
       */
    }),
  sendMessage: isAuthorizedUserProcedure
    .input(z.object({ chatId: z.string().optional(), content: z.string() }))
    .mutation(async (req) => {
      console.log("sendMessage api hited inside chat");

      const { chatId, content } = req.input;
      const { user } = req.ctx;
      const response = await sendMessage({ userId: user.id, chatId, content });
      return response;
    }),
  // .mutation(async ({ input }) => {
  //   const { user, message } = input;

  //   const response = await openai.chat.completions.create({
  //     model: "gpt-3.5-turbo",
  //     messages: [{ role: "user", content: message }],
  //   });

  //   const assistantReply =
  //     response.choices[0].message?.content ||
  //     "Sorry, I couldn't process that.";

  //   await saveConversation(user, [
  //     { role: "user", content: message },
  //     { role: "assistant", content: assistantReply },
  //   ]);

  //   return { response: assistantReply };
  // }),

  getUserChats: isAuthorizedUserProcedure.query(async (req) => {
    const { id } = req.ctx.user;
    return getUserChats({ userId: id });
  }),

  getChatMessages: isAuthorizedUserProcedure
    .input(z.object({ chatId: z.string() }))
    .query(async (req) => {}),

  getChat: isAuthorizedUserProcedure
    .input(z.object({ user: z.string() }))
    .query(async ({ input }) => {
      return await getConversationsByUser(input.user);
    }),
});
