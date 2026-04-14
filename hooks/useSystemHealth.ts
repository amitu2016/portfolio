"use client";

import { useState, useEffect, useCallback } from "react";
import { summaryStats, latencyData, throughputData, errorRateData } from "@/lib/data/metrics";
import type { MetricDataPoint } from "@/types";

interface SystemHealthState {
  tps: number;
  p99: number;
  errorRate: number;
  uptime: number;
  latency: MetricDataPoint[];
  throughput: MetricDataPoint[];
  errors: MetricDataPoint[];
}

/**
 * Simulates live metrics by randomly jittering the mock data on an interval.
 * In a real deployment you'd replace the tick function with a fetch to
 * /api/metrics or a WebSocket subscription.
 */
export function useSystemHealth(intervalMs = 3000): SystemHealthState {
  const [state, setState] = useState<SystemHealthState>({
    tps: summaryStats.totalRps,
    p99: summaryStats.p99Latency,
    errorRate: summaryStats.errorRate,
    uptime: summaryStats.uptime,
    latency: latencyData,
    throughput: throughputData,
    errors: errorRateData,
  });

  const tick = useCallback(() => {
    setState((prev) => ({
      ...prev,
      tps: Math.round(prev.tps * (0.97 + Math.random() * 0.06)),
      p99: Math.round(prev.p99 * (0.92 + Math.random() * 0.16)),
      errorRate: parseFloat((prev.errorRate * (0.8 + Math.random() * 0.4)).toFixed(4)),
    }));
  }, []);

  useEffect(() => {
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [tick, intervalMs]);

  return state;
}
