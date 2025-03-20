import dotenv from "dotenv";
dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT || 4000;
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/mydb";
export const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
export const OPENAI_API_KEY =
  process.env.OPENAI_API_KEY || "your_openai_api_key";
