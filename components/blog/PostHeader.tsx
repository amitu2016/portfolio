import { Clock, Calendar } from "lucide-react";
import { TagBadge } from "./TagBadge";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface PostHeaderProps {
  post: BlogPost;
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className="mb-10 border-b border-border pb-8">
      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground mb-4">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </span>
        <span>·</span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {post.readTime} min read
        </span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">{post.title}</h1>
      <p className="text-lg text-muted-foreground mb-5">{post.excerpt}</p>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
}
