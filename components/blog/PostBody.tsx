import { MDXRemote } from "next-mdx-remote/rsc";

interface PostBodyProps {
  content: string;
}

export function PostBody({ content }: PostBodyProps) {
  return (
    <article className="prose prose-invert prose-blue max-w-none prose-code:font-mono prose-pre:bg-muted prose-pre:border prose-pre:border-border">
      <MDXRemote source={content} />
    </article>
  );
}
