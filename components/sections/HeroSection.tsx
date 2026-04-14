"use client";

import { motion } from "framer-motion";
import { ArrowDown, Bot, Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechBadge } from "@/components/shared/TechBadge";
import { siteConfig } from "@/config/site";

const CORE_SKILLS = [
  "Java",
  "Spring Boot",
  "Apache Kafka",
  "Kubernetes",
  "Distributed Systems",
  "Microservices",
  "Prometheus",
  "OpenTelemetry",
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container relative z-10 flex flex-col items-center text-center gap-6"
      >
        {/* Eyebrow */}
        <motion.p
          variants={item}
          className="font-mono text-sm font-semibold uppercase tracking-widest text-primary"
        >
          Senior Manager · Backend Engineering · ~8 Years
        </motion.p>

        {/* Name */}
        <motion.h1 variants={item} className="text-5xl font-bold tracking-tight md:text-7xl">
          Amit{" "}
          <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Upadhyay
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Building resilient cloud-native systems for banking at scale.
          <br />
          <span className="font-mono text-primary/80">HDFC Bank</span> ·{" "}
          <span className="font-mono text-primary/80">CDAC Mumbai</span> · Java · Spring Boot ·
          Microservices.
        </motion.p>

        {/* Skill badges */}
        <motion.div variants={item} className="flex flex-wrap justify-center gap-2 max-w-xl">
          {CORE_SKILLS.map((skill) => (
            <TechBadge key={skill} label={skill} />
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div variants={item} className="flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild>
            <a href="#projects">View Projects</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={siteConfig.resumeUrl} download>
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </a>
          </Button>
          <Button size="lg" variant="ghost" id="open-chat" aria-label="Chat with AI">
            <Bot className="mr-2 h-4 w-4" />
            Ask the AI
          </Button>
        </motion.div>

        {/* Social links */}
        <motion.div variants={item} className="flex items-center gap-4 text-muted-foreground">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          variants={item}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="mt-8 text-muted-foreground"
        >
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
