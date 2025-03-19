import { router, procedure } from "../config/trpc.config";
import { z } from "zod";
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
});
