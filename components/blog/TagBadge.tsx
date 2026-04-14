import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagBadgeProps {
  tag: string;
  className?: string;
}

export function TagBadge({ tag, className }: TagBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn("text-xs font-mono px-2 py-0.5", className)}
    >
      #{tag}
    </Badge>
  );
}
