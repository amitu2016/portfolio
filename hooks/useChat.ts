"use client";

import { useChat } from "ai/react";

/**
 * Thin wrapper over the Vercel AI SDK useChat hook.
 * Wires the chatbot UI to POST /api/chat.
 */
export function usePortfolioChat() {
  const chat = useChat({
    api: "/api/chat",
    initialMessages: [],
    onError: (err) => {
      console.error("[chat] error:", err.message);
    },
  });

  return chat; // exposes append, setInput, handleInputChange, etc.
}
