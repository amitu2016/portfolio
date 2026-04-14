import { resume } from "@/lib/data/resume";
import type { ResumeChunk } from "@/types";

// ─── Build the searchable chunk corpus at module load (runs once per cold start)

const corpus: ResumeChunk[] = buildChunks();

function buildChunks(): ResumeChunk[] {
  const chunks: ResumeChunk[] = [];

  // Summary
  chunks.push({
    id: "summary",
    text: `Summary: ${resume.summary}`,
    keywords: tokenise(resume.summary),
  });

  // Each experience entry
  for (const exp of resume.experience) {
    const text = [
      `${exp.role} at ${exp.company} (${exp.period}, ${exp.location}).`,
      exp.description,
      "Key achievements:",
      ...exp.highlights.map((h) => `• ${h}`),
      `Technologies: ${exp.tech.join(", ")}.`,
    ].join(" ");

    chunks.push({ id: exp.company, text, keywords: tokenise(text) });
  }

  // Skills grouped by category
  for (const [category, skills] of Object.entries(resume.skills)) {
    const text = `${category} skills: ${skills.join(", ")}.`;
    chunks.push({ id: `skills-${category}`, text, keywords: tokenise(text) });
  }

  // Education
  for (const edu of resume.education) {
    const text = `Education: ${edu.degree} from ${edu.institution} (${edu.period}).`;
    chunks.push({ id: `edu-${edu.institution}`, text, keywords: tokenise(text) });
  }

  // Certifications
  const certText = `Certifications: ${resume.certifications
    .map((c) => `${c.name} (${c.issuer}, ${c.year})`)
    .join("; ")}.`;
  chunks.push({ id: "certs", text: certText, keywords: tokenise(certText) });

  return chunks;
}

// ─── Tokenise a string into lowercase word stems

function tokenise(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

// ─── BM25-inspired keyword overlap score (no external dependencies)

function score(query: string[], chunk: ResumeChunk): number {
  let hits = 0;
  for (const term of query) {
    if (chunk.keywords.includes(term)) hits++;
    // Partial match — term appears as substring in any keyword
    else if (chunk.keywords.some((k) => k.includes(term) || term.includes(k))) {
      hits += 0.4;
    }
  }
  return hits;
}

// ─── Public API

/**
 * Retrieve the top-k most relevant resume chunks for a given query.
 * Returns a single concatenated string ready to inject into the system prompt.
 */
export function retrieveContext(query: string, topK = 3): string {
  const queryTerms = tokenise(query);

  const ranked = corpus
    .map((chunk) => ({ chunk, score: score(queryTerms, chunk) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(({ chunk }) => chunk.text);

  // If nothing matched, return a broad overview (summary + HDFC experience)
  if (ranked.length === 0) {
    return [corpus[0].text, corpus[1].text].join("\n\n");
  }

  return ranked.join("\n\n");
}
