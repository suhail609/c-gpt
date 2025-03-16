import { initTRPC } from "@trpc/server";
import jwt from "jsonwebtoken"; // Make sure to import jwt

type Context = {
  req: Request; // Use Express Request or whatever your request type is
  res: Response; // Optional: if you also need to access the response object
};
// Initialize tRPC
const t = initTRPC.context<Context>().create();

// Export reusable utilities
export const router = t.router;
export const procedure = t.procedure;

//TODO: move trpc intialization to a separate file for better organization and maintainability

const isAuthenticated = t.middleware(({ ctx, next }) => {
  //   const authHeader = ctx.req.headers.authorization;
  const authHeader = ctx.req.headers.get("authorization");
  if (!authHeader) throw new Error("Unauthorized");

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    return next({ ctx: { userId: decoded.id } });
  } catch {
    throw new Error("Unauthorized");
  }
});
