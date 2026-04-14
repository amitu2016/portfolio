import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/blog/posts";
import { PostCard } from "@/components/blog/PostCard";
import { TagBadge } from "@/components/blog/TagBadge";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles on distributed systems, Java, Spring Boot, and production engineering.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-5xl">
        <SectionHeading
          eyebrow="Writing"
          title="Technical Blog"
          subtitle="Deep dives on distributed systems, Java internals, Kafka, Kubernetes, and lessons from 8 years in production banking."
        />

        {/* Tag filter display (static — add interactivity as needed) */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}

        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">
            Posts coming soon. Check back shortly.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
