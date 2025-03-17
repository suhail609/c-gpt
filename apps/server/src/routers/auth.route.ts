import { router, procedure } from "../config/trpc";
import { z } from "zod";
import {
  saveConversation,
  getConversationsByUser,
} from "../services/conversation.service";
import openai from "../config/openai";
import { isAuthorizedUserProcedure } from "../middleware/auth.middleware";
import { loginUser, registerUser } from "../services/auth.service";

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

export const authRouter = router({
  getConversations: procedure
    // .input(z.object({ user: z.string() }))
    .mutation(async ({ input }) => {
      console.log("get conversations api hited inside auth");
      // return await getConversationsByUser(input.user);
    }),

  signin: procedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation((req) => {
      const { email, password } = req.input;
      console.log("input:", req.input);
      return loginUser(email, password);
    }),
  signup: procedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation((req) => {
      console.log(req.input);
      return registerUser(req.input.email, req.input.password);
    }),
  //   createChat: procedure
  //     .input(z.object({ user: z.string(), message: z.string() }))
  //     // .mutation((req) => req.ctx)
  //     .mutation((req) => {
  //       req.input;
  //       req.ctx;
  //       console.log("some mutation");
  //     }),
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

  //   getChat: procedure
  //     .input(z.object({ user: z.string() }))
  //     .query(async ({ input }) => {
  //       return await getConversationsByUser(input.user);
  //     }),

  //   // protected Route
  //   secretData: isAdminProcedure.query(({ ctx }) => {
  //     console.log(ctx);
  //   }),
});
