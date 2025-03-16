import User from "../models/user.model";
import { generateToken } from "../utils/jwt.util";
import { hashPassword, verifyPassword } from "../utils/bcrypt.util";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await hashPassword(password);
  const user = await User.create({ username, email, password: hashedPassword });

  return generateToken(user);
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await verifyPassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return generateToken(user);
};
