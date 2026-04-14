import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { PostCard } from "@/components/blog/PostCard";
import { getLatestPosts } from "@/lib/blog/posts";

export async function BlogPreviewSection() {
  const posts = getLatestPosts(3);

  return (
    <section id="blog" className="py-24 bg-card/30">
      <div className="container">
        <SectionHeading
          eyebrow="Writing"
          title="Technical Blog"
          subtitle="Deep dives on distributed systems, Java internals, and production engineering lessons from banking at scale."
        />

        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">Posts coming soon.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <Button variant="outline" asChild>
            <Link href="/blog">
              View all posts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
