import Link from "next/link";
import { Github, Linkedin, Mail, Terminal } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 py-8">
        <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
          <Terminal className="h-4 w-4 text-primary" />
          <span>
            Built by{" "}
            <span className="text-foreground font-semibold">{siteConfig.name}</span> · Next.js 15 +
            Vercel
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link
            href={`mailto:${siteConfig.email}`}
            aria-label="Email"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
