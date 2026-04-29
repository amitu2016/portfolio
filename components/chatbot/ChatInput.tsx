"use client";

import { type FormEvent, type ChangeEvent } from "react";
import { Send, Square } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  input: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onSuggestionClick: (text: string) => void;
  isLoading: boolean;
  onStop: () => void;
}

const SUGGESTIONS = [
  "What did Amit do at Indian Private bank?",
  "Tell me about his Java expertise.",
  "What are his distributed systems skills?",
];

export function ChatInput({
  input,
  onInputChange,
  onSubmit,
  onSuggestionClick,
  isLoading,
  onStop,
}: ChatInputProps) {
  return (
    <div className="border-t border-border p-3 space-y-2">
      {/* Quick suggestions — only shown when input is empty */}
      {!input && !isLoading && (
        <div className="flex flex-wrap gap-1">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSuggestionClick(s)}
              className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-mono text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={onInputChange}
          placeholder="Ask about Amit's experience..."
          className="flex-1 text-sm h-9 bg-background"
          disabled={isLoading}
          autoComplete="off"
          autoFocus
        />
        {isLoading ? (
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="h-9 w-9 shrink-0"
            onClick={onStop}
          >
            <Square className="h-3.5 w-3.5" />
          </Button>
        ) : (
          <Button
            type="submit"
            size="icon"
            className="h-9 w-9 shrink-0"
            disabled={!input.trim()}
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        )}
      </form>
      <p className="text-center text-[9px] font-mono text-muted-foreground">
        Powered by Vercel AI SDK · Answers grounded in resume
      </p>
    </div>
  );
}
