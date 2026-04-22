import type { MetricDataPoint, ServiceMetric } from "@/types";

// Generate realistic latency data for the last 24 hours
function generateLatencyData(
  baseP50: number,
  baseP99: number,
  points = 24
): MetricDataPoint[] {
  return Array.from({ length: points }, (_, i) => {
    const hour = i.toString().padStart(2, "0") + ":00";
    const spike = i === 14 || i === 19 ? 1.6 : 1; // simulate traffic spikes
    const jitter = 0.85 + Math.random() * 0.3;
    return {
      time: hour,
      value: Math.round(baseP50 * spike * jitter),
    };
  });
}

const TRAFFIC_PROFILE: [number, number][] = [
  [6, 0.3], [9, 0.7], [12, 0.9], [14, 1.2], [17, 1.0], [20, 1.3],
];

function trafficMultiplier(hour: number): number {
  return TRAFFIC_PROFILE.find(([h]) => hour < h)?.[1] ?? 0.6;
}

function generateThroughputData(baseRps: number, points = 24): MetricDataPoint[] {
  return Array.from({ length: points }, (_, i) => {
    const hour = i.toString().padStart(2, "0") + ":00";
    const jitter = 0.9 + Math.random() * 0.2;
    return { time: hour, value: Math.round(baseRps * trafficMultiplier(i) * jitter) };
  });
}

function generateErrorRateData(baseRate: number, points = 24): MetricDataPoint[] {
  return Array.from({ length: points }, (_, i) => {
    const hour = i.toString().padStart(2, "0") + ":00";
    const spike = i === 3 ? 5 : 1; // simulate a 3am anomaly
    const jitter = 0.5 + Math.random() * 1.5;
    return { time: hour, value: Math.round(baseRate * spike * jitter * 1000) / 1000 };
  });
}

export const latencyData = generateLatencyData(8, 45);
export const throughputData = generateThroughputData(18500);
export const errorRateData = generateErrorRateData(0.012);

export const serviceMetrics: ServiceMetric[] = [
  {
    name: "Transaction Service",
    p50: 8,
    p95: 22,
    p99: 45,
    errorRate: 0.008,
    uptime: 99.99,
    rps: 12400,
  },
  {
    name: "Auth Gateway",
    p50: 4,
    p95: 12,
    p99: 28,
    errorRate: 0.002,
    uptime: 99.999,
    rps: 8200,
  },
  {
    name: "Notification Service",
    p50: 35,
    p95: 120,
    p99: 280,
    errorRate: 0.05,
    uptime: 99.95,
    rps: 3100,
  },
  {
    name: "Ledger Service",
    p50: 12,
    p95: 38,
    p99: 72,
    errorRate: 0.001,
    uptime: 99.999,
    rps: 6800,
  },
];

export const summaryStats = {
  totalRps: 22000,
  p99Latency: 45,
  errorRate: 0.008,
  uptime: 99.99,
  activeCircuitBreakers: 0,
  kafkaLag: 142,
};
