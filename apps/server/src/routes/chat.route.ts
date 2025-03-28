import { z } from "zod";
import { router } from "../config/trpc.config";
import { isAuthorizedUserProcedure } from "../guards/user.guard";
import {
  getChatMessages,
  getUserChats,
  sendMessage,
} from "../services/chat.service";

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
  sendMessage: isAuthorizedUserProcedure
    .input(z.object({ chatId: z.string().optional(), content: z.string() }))
    .output(
      z.object({
        id: z.string(),
        userId: z.string(),
        chatId: z.string(),
        content: z.string(),
        isAI: z.boolean(),
        createdAt: z.string(),
      })
    )
    .mutation(async (req) => {
      const { chatId, content } = req.input;
      const { user } = req.ctx;
      const response = await sendMessage({ userId: user.id, chatId, content });
      return response;
    }),

  getUserChats: isAuthorizedUserProcedure
    .output(
      z.array(
        z.object({
          id: z.string(),
          userId: z.string(),
          createdAt: z.string(),
          lastMessage: z.string().optional(),
        })
      )
    )
    .query(async (req) => {
      const { id } = req.ctx.user;
      const userChats = await getUserChats({ userId: id });
      return userChats;
    }),

  getChatMessages: isAuthorizedUserProcedure
    .input(z.object({ chatId: z.string() }))
    .output(
      z.array(
        z.object({
          id: z.string(),
          userId: z.string(),
          chatId: z.string(),
          content: z.string(),
          isAI: z.boolean(),
          createdAt: z.string(),
        })
      )
    )
    .query(async (req) => {
      const { chatId } = req.input;
      const response = await getChatMessages({ chatId });
      return response;
    }),
});
