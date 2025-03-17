import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { verifyToken } from "./utils/jwt.util";

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  const authHeader = req.headers.authorization;

  let user = null;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      user = verifyToken(token);
    } catch (error) {
      console.log("Invalid Token");
    }
  }

  return { user };
};
