"use client";

import { useChat } from "ai/react";

export function usePortfolioChat() {
  return useChat({
    api: "/api/chat",
    onError: (err) => {
      console.error("[chat] error:", err.message);
    },
  });
}
