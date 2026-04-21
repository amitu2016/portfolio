"use client";

import { motion } from "framer-motion";
import { Building2, GraduationCap, Award, Code2, Cloud, Database, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TechBadge } from "@/components/shared/TechBadge";
import { resume } from "@/lib/data/resume";

const SKILL_ICONS: Record<string, React.ElementType> = {
  "Languages & Frameworks": Code2,
  "Cloud & DevOps": Cloud,
  "Data & Observability": Database,
  "Core Engineering": Cpu,
};

export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="container">
        <SectionHeading
          eyebrow="Background"
          title="About Me"
          subtitle={resume.summary}
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Experience timeline */}
          <div className="lg:col-span-2 space-y-0">
            <h3 className="flex items-center gap-2 font-semibold text-lg mb-6">
              <Building2 className="h-5 w-5 text-primary" />
              Experience
            </h3>

            <div className="relative pl-6">
              {/* Vertical connector line */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent" />

              <div className="space-y-8">
                {resume.experience.map((exp, i) => (
                  <motion.div
                    key={exp.company}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[25px] top-5 h-3 w-3 rounded-full border-2 border-primary bg-background shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />

                    <Card className="border-border/60 bg-card/80 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <h4 className="font-semibold text-foreground">{exp.role}</h4>
                            <p className="text-primary font-mono text-sm">{exp.company}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {exp.period} · {exp.location}
                            </p>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground">{exp.description}</p>
                        <ul className="mt-3 space-y-1.5">
                          {exp.highlights.slice(0, 3).map((h) => (
                            <li key={h} className="flex gap-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-0.5 shrink-0">▸</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {exp.tech.map((t) => (
                            <TechBadge key={t} label={t} />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: skills + education + certs */}
          <div className="space-y-6">
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="flex items-center gap-2 font-semibold text-lg mb-4">
                <span className="text-primary font-mono">{`{}`}</span>
                Skills
              </h3>
              <div className="space-y-4">
                {Object.entries(resume.skills).map(([category, skills]) => {
                  const Icon = SKILL_ICONS[category] ?? Code2;
                  return (
                    <div key={category}>
                      <p className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                        <Icon className="h-3.5 w-3.5 text-primary/70 shrink-0" />
                        {category}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.map((s) => (
                          <TechBadge key={s} label={s} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="flex items-center gap-2 font-semibold text-lg mb-4">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education
              </h3>
              {resume.education.map((edu) => (
                <Card key={edu.institution} className="border-border/60 bg-card/80">
                  <CardContent className="p-4">
                    <p className="font-medium text-sm">{edu.degree}</p>
                    <p className="text-xs text-primary font-mono">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground">{edu.period}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="flex items-center gap-2 font-semibold text-lg mb-4">
                <Award className="h-5 w-5 text-primary" />
                Certifications
              </h3>
              <div className="space-y-2">
                {resume.certifications.map((cert) => (
                  <Card key={cert.name} className="border-border/60 bg-card/80">
                    <CardContent className="p-4">
                      <p className="font-medium text-sm">{cert.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {cert.issuer} · {cert.year}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
