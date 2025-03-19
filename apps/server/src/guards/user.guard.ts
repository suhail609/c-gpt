import { middleware, procedure } from "../config/trpc.config";
import { TRPCError } from "@trpc/server";

const isAuthorizedUser = middleware(({ ctx, next }) => {
  if (!ctx.user?.id) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized User",
    });
  }

  return next({ ctx: { user: { id: ctx.user.id, email: ctx.user.email } } });
});

export const isAuthorizedUserProcedure = procedure.use(isAuthorizedUser);
