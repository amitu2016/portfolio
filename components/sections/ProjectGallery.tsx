"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, TrendingUp } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TechBadge } from "@/components/shared/TechBadge";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { projects } from "@/lib/data/projects";

export function ProjectGallery() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 bg-card/30">
      <div className="container">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured Projects"
          subtitle="Production systems built at an Indian Private bank and an Autonomous Society of MeitY, GOI — engineered for reliability, performance, and scale."
        />

        {/* Featured grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full flex flex-col border-border/60 bg-card/80 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <span className="text-xs font-mono uppercase tracking-wider text-primary border border-primary/30 rounded px-1.5 py-0.5 shrink-0">
                      {project.category}
                    </span>
                  </div>
                  <CardDescription className="text-sm">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  {project.metrics && (
                    <p className="mb-3 flex items-center gap-1.5 text-xs font-mono text-green-400">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {project.metrics}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <TechBadge key={t} label={t} />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  {project.github && (
                    <Button variant="ghost" size="sm" className="gap-1.5" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" /> Code
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button variant="ghost" size="sm" className="gap-1.5" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" /> Demo
                      </a>
                    </Button>
                  )}
                  {!project.github && !project.demo && (
                    <span className="text-xs text-muted-foreground font-mono">Internal — NDA</span>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Secondary projects */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="border-border/40 bg-card/60 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/8 transition-all duration-300 group">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold group-hover:text-primary transition-colors">{project.title}</h4>
                    <span className="text-[10px] font-mono uppercase text-muted-foreground border border-border rounded px-1.5 py-0.5">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{project.description}</p>
                  {project.metrics && (
                    <p className="text-[10px] font-mono text-green-400 mb-2">{project.metrics}</p>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 4).map((t) => (
                      <TechBadge key={t} label={t} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
