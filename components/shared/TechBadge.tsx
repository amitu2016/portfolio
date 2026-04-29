import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  label: string;
  className?: string;
}

export function TechBadge({ label, className }: TechBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-primary/30 bg-primary/5 text-primary font-mono text-xs transition-all duration-200 hover:border-primary/60 hover:bg-primary/10 hover:shadow-sm hover:shadow-primary/10 cursor-default",
        className
      )}
    >
      {label}
    </Badge>
  );
}
