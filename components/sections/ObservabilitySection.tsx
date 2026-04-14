"use client";

import { Activity, AlertCircle, Gauge, TrendingUp, Zap } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { MetricCard } from "@/components/shared/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { latencyData, throughputData, errorRateData, serviceMetrics, summaryStats } from "@/lib/data/metrics";

export function ObservabilitySection() {
  return (
    <section id="observability" className="py-24">
      <div className="container">
        <SectionHeading
          eyebrow="System Health"
          title="Live Observability Dashboard"
          subtitle="Mimicking the Grafana dashboards I built at HDFC Bank — Prometheus metrics, distributed traces, and SLO tracking across 50+ microservices."
        />

        {/* KPI row */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-8">
          <MetricCard
            label="Throughput"
            value={summaryStats.totalRps.toLocaleString()}
            unit="TPS"
            icon={TrendingUp}
            trend="up"
            trendLabel="↑ 12% vs last week"
            index={0}
          />
          <MetricCard
            label="P99 Latency"
            value={summaryStats.p99Latency}
            unit="ms"
            icon={Gauge}
            trend="neutral"
            trendLabel="within SLO < 100ms"
            index={1}
          />
          <MetricCard
            label="Error Rate"
            value={(summaryStats.errorRate * 100).toFixed(3)}
            unit="%"
            icon={AlertCircle}
            trend="down"
            trendLabel="↓ 0.002% vs yesterday"
            index={2}
          />
          <MetricCard
            label="Uptime"
            value={summaryStats.uptime}
            unit="%"
            icon={Activity}
            trend="up"
            trendLabel="SLO target 99.9%"
            index={3}
          />
        </div>

        {/* Charts grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {/* Latency over time */}
          <Card className="border-border/60 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono text-muted-foreground flex items-center gap-2">
                <Gauge className="h-4 w-4 text-primary" />
                P50 Latency — Last 24h (ms)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={latencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} interval={5} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} unit="ms" />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    name="P50 Latency"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Throughput */}
          <Card className="border-border/60 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                Throughput — Last 24h (RPS)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={throughputData}>
                  <defs>
                    <linearGradient id="throughputGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} interval={5} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#34d399"
                    strokeWidth={2}
                    fill="url(#throughputGrad)"
                    name="RPS"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Per-service table */}
        <Card className="border-border/60 bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono text-muted-foreground flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              Service Latency Breakdown (ms)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={serviceMetrics} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} unit="ms" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} width={140} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="p50" name="P50" fill="#60a5fa" radius={[0, 3, 3, 0]} />
                <Bar dataKey="p95" name="P95" fill="#a78bfa" radius={[0, 3, 3, 0]} />
                <Bar dataKey="p99" name="P99" fill="#f87171" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
