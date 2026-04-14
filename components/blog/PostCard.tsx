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

export function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`} className="block h-full group">
        <Card className="h-full flex flex-col border-border/60 bg-card/80 hover:border-primary/40 transition-colors">
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
          <CardFooter>
            <span className="flex items-center gap-1 text-xs text-primary font-mono group-hover:gap-2 transition-all">
              Read post <ArrowRight className="h-3 w-3" />
            </span>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
