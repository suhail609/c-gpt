import jwt from "jsonwebtoken";
import { UserInterface } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (user: UserInterface) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { id: string; email: string };
};
