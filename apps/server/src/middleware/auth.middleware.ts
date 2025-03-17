import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { middleware, procedure } from "../config/trpc";
import { TRPCError } from "@trpc/server";

// const JWT_SECRET = process.env.JWT_SECRET as string;
// export const authenticate = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.header("Authorization")?.split(" ")[1];

//   if (!token) return res.status(401).json({ message: "Access Denied" });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
//     (req as any).userId = decoded.id;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid Token" });
//   }
// };

//trpc from webdevsimplified
// const isAdminMiddleware = middleware(({ ctx, next }) => {
//   if (!ctx.user) {
//     throw new TRPCError({ code: "UNAUTHORIZED", message: "Not an admin" });
//   }

//   return next({ ctx: { user: { id: 1 } } });
// });

// export const isAdminProcedure = procedure.use(isAdminMiddleware);

const isAuthorizedUser = middleware(({ ctx, next }) => {
  if (!ctx.user?.id) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not an admin" });
  }

  return next({ ctx: { user: ctx.user } });
});

export const isAuthorizedUserProcedure = procedure.use(isAuthorizedUser);

// const isAuthenticated = t.middleware(({ ctx, next }) => {
//   //   const authHeader = ctx.req.headers.authorization;
//   const authHeader = ctx.req.headers.get("authorization");
//   if (!authHeader) throw new Error("Unauthorized");

//   try {
//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
//       id: string;
//     };
//     return next({ ctx: { userId: decoded.id } });
//   } catch {
//     throw new Error("Unauthorized");
//   }
// });
