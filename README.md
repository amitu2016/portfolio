# Amit Kumar Upadhyay — Portfolio

Personal portfolio site for Amit Kumar Upadhyay, Senior Backend Engineer with ~8 years of expertise in Java, Spring Boot, and cloud-native distributed systems. Currently Senior Manager at an Indian Private bank.

**Live:** https://amitupadhyay.co.in

## Features

- **Sections** — Hero, About, System Design, Observability, Projects, Blog preview, Contact
- **MDX Blog** — Posts authored in Markdown with YAML frontmatter, statically generated at build time
- **AI Chatbot** — Floating chat widget powered by OpenRouter with BM25-style RAG over resume data (no vector DB)
- **System Design Diagram** — Interactive microservices architecture diagram via React Flow
- **Observability Dashboard** — Metrics charts built with Recharts
- **Dark mode** — Class-based theming via `next-themes`
- **Animations** — Page and scroll animations with Framer Motion

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 + shadcn/ui |
| AI | Vercel AI SDK + OpenRouter |
| Diagrams | React Flow (`@xyflow/react`) |
| Charts | Recharts |
| Blog | next-mdx-remote + gray-matter |
| Animations | Framer Motion |

## Getting Started

```bash
npm install
```

Create `.env.local` and add your OpenRouter key:

```
OPENROUTER_API_KEY=your_key_here
```

```bash
npm run dev      # Dev server with Turbopack on localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Project Structure

```
app/                  # Next.js App Router pages
  blog/               # Blog listing and post pages
  api/chat/           # AI chatbot edge route
components/
  sections/           # Page section components
  chatbot/            # Floating chat widget
  blog/               # Blog list and renderer
  ui/                 # shadcn primitives
config/
  site.ts             # Sitewide metadata, nav, social links
content/
  posts/              # MDX blog posts
lib/
  data/               # Static data: resume, projects, metrics
  ai/                 # RAG retrieval and prompt builder
  blog/               # MDX parsing helpers
```

## Connect

- LinkedIn: https://linkedin.com/in/upadhyayamitk/
- GitHub: https://github.com/amitu2016
- Medium: https://medium.com/@amitu2016
- Email: amitu2016@gmail.com
