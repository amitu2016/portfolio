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
        "border-primary/30 bg-primary/5 text-primary font-mono text-xs",
        className
      )}
    >
      {label}
    </Badge>
  );
}
