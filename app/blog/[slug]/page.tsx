import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getAllSlugs, getPostBySlug } from "@/lib/blog/posts";
import { PostHeader } from "@/components/blog/PostHeader";
import { PostBody } from "@/components/blog/PostBody";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ slug: string }>;
}

// Pre-render all post pages at build time
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-3xl">
        <Button variant="ghost" size="sm" className="mb-8 -ml-2 gap-1.5 font-mono" asChild>
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4" />
            All posts
          </Link>
        </Button>

        <PostHeader post={post} />
        <PostBody content={post.content!} />
      </div>
    </div>
  );
}
