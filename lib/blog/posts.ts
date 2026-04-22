import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { estimateReadTime } from "@/lib/utils";
import type { BlogPost } from "@/types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function parsePost(slug: string, raw: string): BlogPost {
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title as string,
    excerpt: data.excerpt as string,
    date: data.date as string,
    tags: (data.tags as string[]) ?? [],
    readTime: data.readTime ?? estimateReadTime(content),
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  let files: string[];
  try {
    files = fs.readdirSync(POSTS_DIR);
  } catch {
    return [];
  }

  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
      const { content: _, ...meta } = parsePost(slug, raw);
      return meta as BlogPost;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf8");
    return parsePost(slug, raw);
  } catch {
    return null;
  }
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function getLatestPosts(n = 3): BlogPost[] {
  return getAllPosts().slice(0, n);
}
