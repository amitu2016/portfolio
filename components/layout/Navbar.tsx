"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Sun, Moon, FileDown, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const HASH_NAV = siteConfig.nav.filter((n) => n.href.startsWith("#"));

function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = HASH_NAV.map((n) => n.href.slice(1));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const activeSection = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-border/50 bg-background/75 backdrop-blur-xl shadow-sm shadow-background/20"
            : "bg-transparent"
        )}
      >
        <nav className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-mono text-primary font-semibold">
            <Terminal className="h-5 w-5" />
            <span>amitupadhyay.co.in</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {siteConfig.nav.map((item) => {
              const isActive = item.href === activeSection;
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm transition-colors rounded-md hover:bg-accent",
                      isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="relative h-9 w-9"
            >
              <Sun className="absolute h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5" asChild>
              <a href={siteConfig.resumeUrl} download>
                <FileDown className="h-3.5 w-3.5" />
                Resume
              </a>
            </Button>
            <Button size="sm" className="gap-1.5" asChild>
              <a href={`mailto:${siteConfig.email}`}>
                <Mail className="h-3.5 w-3.5" />
                Hire Me
              </a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-background/95 backdrop-blur-md"
            >
              <ul className="container flex flex-col py-4 gap-1">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors",
                        item.href === activeSection
                          ? "text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5" asChild>
                      <a href={siteConfig.resumeUrl} download>
                        <FileDown className="h-3.5 w-3.5" />
                        Resume
                      </a>
                    </Button>
                    <Button size="sm" className="flex-1 gap-1.5" asChild>
                      <a href={`mailto:${siteConfig.email}`}>
                        <Mail className="h-3.5 w-3.5" />
                        Hire Me
                      </a>
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full gap-2 justify-start"
                    onClick={() => { setTheme(resolvedTheme === "dark" ? "light" : "dark"); setOpen(false); }}
                  >
                    <span className="relative h-4 w-4 shrink-0">
                      <Sun className="absolute h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </span>
                    <span>{resolvedTheme === "dark" ? "Light mode" : "Dark mode"}</span>
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
