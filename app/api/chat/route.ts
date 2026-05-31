import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { retrieveContext } from "@/lib/ai/rag";
import { buildSystemPrompt } from "@/lib/ai/prompts";

export const runtime = "edge";
export const maxDuration = 30;

const deepseek = createOpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY ?? "",
});

const MODEL = "deepseek-chat";

const MAX_MESSAGE_LENGTH = 500;
const MAX_MESSAGES = 20;

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above|your)\s+instructions/i,
  /you\s+are\s+now\s+(a\s+)?(?!amit)/i,
  /act\s+as\s+(a\s+)?(?!amit)/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /reveal\s+(your\s+)?(system\s+)?prompt/i,
  /print\s+(your\s+)?(system\s+)?prompt/i,
  /show\s+(me\s+)?(your\s+)?(system\s+)?instructions/i,
  /jailbreak/i,
  /dan\s+mode/i,
];

function looksLikeInjection(text: string): boolean {
  return INJECTION_PATTERNS.some((re) => re.test(text));
}

export async function POST(req: Request) {
  const body = await req.json();
  const raw: unknown[] = Array.isArray(body?.messages) ? body.messages : [];

  // Only accept user/assistant turns from the client; drop any injected system/tool roles
  // and cap length to limit prompt injection surface
  const messages = raw
    .filter(
      (m): m is { role: "user" | "assistant"; content: string } =>
        typeof m === "object" &&
        m !== null &&
        ((m as { role: string }).role === "user" ||
          (m as { role: string }).role === "assistant")
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({
      role: m.role,
      content: String(m.content).slice(0, MAX_MESSAGE_LENGTH),
    }));

  const lastUserMessage =
    messages.findLast((m) => m.role === "user")?.content ?? "";

  if (!lastUserMessage) {
    return new Response("Bad Request", { status: 400 });
  }

  if (looksLikeInjection(lastUserMessage)) {
    return new Response(
      JSON.stringify({ error: "Message not allowed." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const context = retrieveContext(lastUserMessage, 3);
  const systemPrompt = buildSystemPrompt(context);

  const result = streamText({
    model: deepseek(MODEL),
    system: systemPrompt,
    messages,
    maxTokens: 400,
    temperature: 0.3,
  });

  return result.toDataStreamResponse();
}
