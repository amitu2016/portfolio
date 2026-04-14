"use client";

import { motion } from "framer-motion";
import { Building2, GraduationCap, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TechBadge } from "@/components/shared/TechBadge";
import { resume } from "@/lib/data/resume";

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
          <div className="lg:col-span-2 space-y-6">
            <h3 className="flex items-center gap-2 font-semibold text-lg">
              <Building2 className="h-5 w-5 text-primary" />
              Experience
            </h3>
            {resume.experience.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Card className="border-border/60 bg-card/80">
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
                {Object.entries(resume.skills).map(([category, skills]) => (
                  <div key={category}>
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                      {category}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((s) => (
                        <TechBadge key={s} label={s} />
                      ))}
                    </div>
                  </div>
                ))}
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
