"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TagBadge } from "./TagBadge";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface PostCardProps {
  post: BlogPost;
  index?: number;
}

const MAX_READ_TIME = 20;

export function PostCard({ post, index = 0 }: PostCardProps) {
  const progressPct = Math.min((post.readTime / MAX_READ_TIME) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} className="block h-full group">
        <Card className="h-full flex flex-col border-border/60 bg-card/80 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono mb-2">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime} min read
              </span>
            </div>
            <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
              {post.title}
            </CardTitle>
            <CardDescription className="text-sm line-clamp-2">{post.excerpt}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-3 pt-3">
            <span className="flex items-center gap-1 text-xs text-primary font-mono group-hover:gap-2 transition-all">
              Read post <ArrowRight className="h-3 w-3" />
            </span>
            {/* Read-time progress bar */}
            <div className="h-0.5 w-full rounded-full bg-border/50 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary/70 to-blue-400/70"
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3, ease: "easeOut" }}
              />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
