"use client";
import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface Props {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ from = 0, to, duration = 1.5, suffix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(v) {
        el.textContent = Math.round(v).toLocaleString() + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, from, to, duration, suffix]);

  return (
    <span ref={ref} className={className}>
      {from}{suffix}
    </span>
  );
}
