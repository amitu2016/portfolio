import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { retrieveContext } from "@/lib/ai/rag";
import { buildSystemPrompt } from "@/lib/ai/prompts";

export const runtime = "edge";
export const maxDuration = 30;

// OpenRouter exposes an OpenAI-compatible API — no extra package needed.
// Free models: meta-llama/llama-3.1-8b-instruct:free
//              mistralai/mistral-7b-instruct:free
//              google/gemma-2-9b-it:free
// Paid but cheap: openai/gpt-4o-mini (~$0.15/1M tokens)
const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
  headers: {
    // OpenRouter requires these for rate-limiting and analytics
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    "X-Title": "Amit Upadhyay Portfolio",
  },
});

const MODEL = "openai/gpt-oss-120b:free";

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Retrieve the most relevant resume chunks for this query
  const lastUserMessage: string =
    messages.findLast((m: { role: string }) => m.role === "user")?.content ?? "";

  const context = retrieveContext(lastUserMessage, 3);
  const systemPrompt = buildSystemPrompt(context);

  const result = streamText({
    model: openrouter(MODEL),
    system: systemPrompt,
    messages,
    maxTokens: 400,
    temperature: 0.3,
  });

  return result.toDataStreamResponse();
}
