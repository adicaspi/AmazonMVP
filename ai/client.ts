// ai/client.ts
import dotenv from "dotenv";
import path from "path";

// Try to load .env.local first, then fall back to .env
dotenv.config({ path: path.join(process.cwd(), ".env.local") });
dotenv.config(); // This will load .env if .env.local doesn't exist

import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "OPENAI_API_KEY not set. Put it in .env.local or export it in the shell."
  );
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
