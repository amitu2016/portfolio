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
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
      const post = parsePost(slug, raw);
      // Strip content for the index listing
      const { content: _, ...meta } = post;
      return meta as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  return parsePost(slug, raw);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
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
