"use client";

import dynamic from "next/dynamic";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Loader2 } from "lucide-react";

// Lazy-load the heavy React Flow canvas to avoid SSR issues
const ArchitectureDiagram = dynamic(() => import("./ArchitectureDiagram"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] items-center justify-center rounded-lg border border-border bg-card">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  ),
});

export function SystemDesignSection() {
  return (
    <section id="system-design" className="py-24 bg-card/30">
      <div className="container">
        <SectionHeading
          eyebrow="Architecture"
          title="System Design Showcase"
          subtitle="High-concurrency microservices architecture powering 22,000 TPS at an Indian Private bank — resilient by design, observable by default."
        />
        <ArchitectureDiagram />
        <p className="mt-4 text-center text-xs font-mono text-muted-foreground">
          Drag to pan · Scroll to zoom · Hover nodes for details
        </p>
      </div>
    </section>
  );
}
