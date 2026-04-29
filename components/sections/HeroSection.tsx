"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Bot, Download, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechBadge } from "@/components/shared/TechBadge";
import { MediumIcon } from "@/components/shared/MediumIcon";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
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

const STATS = [
  { label: "Years Experience", value: 8, suffix: "+" },
  { label: "Microservices", value: 50, suffix: "+" },
  { label: "Peak TPS", value: 8000, suffix: "+" },
  { label: "Uptime SLO", value: 99, suffix: ".9%" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Aurora blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora-1 absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[100px]" />
        <div className="aurora-2 absolute top-1/2 right-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/6 blur-[90px]" />
        <div className="aurora-3 absolute bottom-1/4 left-1/2 h-[350px] w-[350px] rounded-full bg-indigo-500/5 blur-[80px]" />
      </div>

      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

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
        <motion.h1 variants={item} className="text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl">
          Amit{" "}
          <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Upadhyay
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="max-w-2xl text-base text-muted-foreground md:text-xl px-4 sm:px-0"
        >
          Building resilient cloud-native systems for banking at scale.{" "}
          <span className="font-mono text-primary/80">an Indian Private bank</span> ·{" "}
          <span className="font-mono text-primary/80">an Autonomous Society of MeitY, GOI Mumbai</span> · Java · Spring Boot ·
          Microservices.
        </motion.p>

        {/* Stats row */}
        <motion.div
          variants={item}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl px-4 sm:px-0"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-xl border border-border/50 bg-card/40 px-4 py-3 backdrop-blur-sm"
            >
              <span className="text-2xl font-bold font-mono text-foreground">
                <AnimatedCounter to={stat.value} suffix={stat.suffix} duration={1.8} />
              </span>
              <span className="mt-0.5 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Skill badges */}
        <motion.div variants={item} className="flex flex-wrap justify-center gap-2 max-w-xl">
          {CORE_SKILLS.map((skill) => (
            <TechBadge key={skill} label={skill} />
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div variants={item} className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 w-full sm:w-auto px-4 sm:px-0">
          <Button size="lg" className="w-full sm:w-auto" asChild>
            <a href="#projects">View Projects</a>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
            <a href={siteConfig.resumeUrl} download>
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </a>
          </Button>
          <Button size="lg" variant="ghost" id="open-chat" aria-label="Chat with AI" className="w-full sm:w-auto">
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
            <MediumIcon className="h-5 w-5" />
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
