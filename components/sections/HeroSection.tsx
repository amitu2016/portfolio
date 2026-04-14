"use client";

import Image from "next/image";
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
        {/* Avatar */}
        <motion.div variants={item} className="relative mb-2 mt-4">
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-primary via-blue-400 to-indigo-500 opacity-60 blur-lg animate-pulse" />
          <div className="relative h-36 w-36 sm:h-40 sm:w-40 overflow-hidden rounded-full border-[3px] border-background/50 shadow-2xl ring-4 ring-primary/20 ring-offset-background transition-transform hover:scale-105 duration-300">
            <Image
              src="/1000180270.JPG"
              alt="Amit Upadhyay"
              fill
              sizes="(max-width: 768px) 144px, 160px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

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
          <a
            href={siteConfig.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
            </svg>
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
