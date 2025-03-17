import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

//TODO: bring all env file to one index file and export from there

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function runOpenAI() {
  const assistant = await openai.beta.assistants.create({
    name: "Chat Assistant",
    instructions:
      "You are a personal assistant. Who can answer question precisely and concisely.",
    // tools: [{ type: "code_interpreter" }],
    model: "gpt-4o-2024-11-20",
    // model: "gpt-4o",
    // model: "gpt-3.5-turbo",
  });

  return assistant;
}

export default openai;
