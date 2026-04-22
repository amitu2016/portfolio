"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
  className?: string;
  index?: number;
}

export function MetricCard({
  label,
  value,
  unit,
  icon: Icon,
  trend = "neutral",
  trendLabel,
  className,
  index = 0,
}: MetricCardProps) {
  const numericValue = typeof value === "number" ? value : Number(value);
  const isNumeric = !isNaN(numericValue);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className={cn("border-border/60 bg-card/80 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/8 transition-all duration-300", className)}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {label}
              </p>
              <p className="mt-1 text-2xl font-bold font-mono">
                {isNumeric ? (
                  <AnimatedCounter to={numericValue} duration={1.8} />
                ) : (
                  value
                )}
                {unit && <span className="ml-1 text-sm font-normal text-muted-foreground">{unit}</span>}
              </p>
              {trendLabel && (
                <p
                  className={cn(
                    "mt-1 text-xs font-mono",
                    trend === "up" && "text-green-400",
                    trend === "down" && "text-red-400",
                    trend === "neutral" && "text-muted-foreground"
                  )}
                >
                  {trendLabel}
                </p>
              )}
            </div>
            <div className="rounded-md bg-primary/10 p-2">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
