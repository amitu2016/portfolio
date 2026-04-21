# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run lint     # ESLint
npm run start    # Start production server
```

No test suite is configured.

## Architecture

Next.js 15 App Router portfolio with TypeScript, Tailwind CSS, and shadcn/ui components.

### Main Sections

**Home page** (`app/page.tsx`) composes six section components: Hero, About, SystemDesign, Observability, ProjectGallery, BlogPreview.

**Blog** (`app/blog/`) — MDX files in `content/posts/` with YAML frontmatter. `lib/blog/posts.ts` reads and parses them via `gray-matter` + `next-mdx-remote`. Posts are statically generated at build time via `generateStaticParams`.

**Chatbot** (`app/api/chat/route.ts`) — Edge runtime POST endpoint. Uses OpenRouter (`OPENROUTER_API_KEY` in `.env.local`). RAG implemented without a vector DB: `lib/ai/rag.ts` scores resume chunks via BM25-style keyword overlap, injects top-3 into the system prompt from `lib/ai/prompts.ts`. Resume data lives in `lib/data/resume.ts`.

**System Design diagram** (`components/sections/SystemDesignSection.tsx`) — Lazy-loaded with `dynamic(..., { ssr: false })` to avoid React Flow hydration issues. The diagram is hardcoded microservices architecture data, not fetched from anywhere.

### Key Directories

- `components/sections/` — Page section components
- `components/chatbot/` — Floating chat widget + modal
- `components/blog/` — Post listing and rendering
- `components/ui/` — shadcn primitives
- `lib/data/` — Static data: `resume.ts`, `projects.ts`, `metrics.ts`
- `lib/ai/` — RAG retrieval (`rag.ts`) and prompt builder (`prompts.ts`)
- `config/site.ts` — Sitewide metadata, nav links, social URLs, resume PDF path

### Styling

Dark mode via `class` strategy in `tailwind.config.ts`. Colors use HSL CSS custom properties defined in `app/globals.css`. The `cn()` utility from `lib/utils.ts` merges Tailwind classes (clsx + tailwind-merge).
