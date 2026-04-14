"use client";

import { useEffect, useRef } from "react";
import { Bot, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Message } from "ai";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

const WELCOME = "Hi! I'm Amit's AI assistant. Ask me anything about his experience at HDFC Bank, CDAC, Java expertise, system design work, or skills. How can I help?";

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <ScrollArea className="h-[340px] px-4 py-3">
      {/* Welcome message */}
      <AssistantBubble content={WELCOME} />

      {messages.map((msg) =>
        msg.role === "user" ? (
          <UserBubble key={msg.id} content={msg.content} />
        ) : (
          <AssistantBubble key={msg.id} content={msg.content} />
        )
      )}

      {isLoading && (
        <div className="flex gap-2 mb-3">
          <Avatar className="h-7 w-7 shrink-0">
            <AvatarFallback className="bg-primary/10">
              <Bot className="h-3.5 w-3.5 text-primary" />
            </AvatarFallback>
          </Avatar>
          <div className="rounded-lg bg-muted px-3 py-2">
            <span className="flex gap-1 items-center h-5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-pulse-slow"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </span>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </ScrollArea>
  );
}

function AssistantBubble({ content }: { content: string }) {
  return (
    <div className="flex gap-2 mb-3">
      <Avatar className="h-7 w-7 shrink-0 mt-0.5">
        <AvatarFallback className="bg-primary/10">
          <Bot className="h-3.5 w-3.5 text-primary" />
        </AvatarFallback>
      </Avatar>
      <div className="max-w-[85%] rounded-lg bg-muted px-3 py-2 text-sm leading-relaxed">
        {content}
      </div>
    </div>
  );
}

function UserBubble({ content }: { content: string }) {
  return (
    <div className="flex gap-2 mb-3 flex-row-reverse">
      <Avatar className="h-7 w-7 shrink-0 mt-0.5">
        <AvatarFallback className="bg-secondary">
          <User className="h-3.5 w-3.5" />
        </AvatarFallback>
      </Avatar>
      <div className="max-w-[85%] rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm leading-relaxed">
        {content}
      </div>
    </div>
  );
}
