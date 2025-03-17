import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";
import dotenv from "dotenv";
//TODO: put env configurations to separate fi
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

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
