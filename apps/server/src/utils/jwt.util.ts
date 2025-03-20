import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";
import { JWT_SECRET } from "../config/env.config";

export const generateToken = (user: IUser) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  try {
    const user = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    return user;
  } catch (error) {
    throw new Error("Invalid Token");
  }
};
