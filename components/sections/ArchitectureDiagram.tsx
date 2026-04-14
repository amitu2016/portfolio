"use client";

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  type NodeProps,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// ─── Custom Node ────────────────────────────────────────────────────────────

type NodeData = {
  label: string;
  sublabel?: string;
  color: string;
};

function ServiceNode({ data }: NodeProps) {
  const nodeData = data as NodeData;
  return (
    <div
      className="rounded-lg border px-4 py-3 min-w-[140px] text-center shadow-lg"
      style={{ borderColor: nodeData.color, backgroundColor: `${nodeData.color}18` }}
    >
      <Handle type="target" position={Position.Top} style={{ borderColor: nodeData.color }} />
      <p className="text-sm font-semibold text-foreground">{nodeData.label}</p>
      {nodeData.sublabel && (
        <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{nodeData.sublabel}</p>
      )}
      <Handle type="source" position={Position.Bottom} style={{ borderColor: nodeData.color }} />
    </div>
  );
}

const nodeTypes = { service: ServiceNode };

// ─── Graph definition ────────────────────────────────────────────────────────

const nodes: Node[] = [
  // Layer 0: Entry
  {
    id: "gateway",
    type: "service",
    position: { x: 300, y: 0 },
    data: { label: "API Gateway", sublabel: "Spring Cloud Gateway", color: "#60a5fa" },
  },
  // Layer 1: Services
  {
    id: "auth",
    type: "service",
    position: { x: 60, y: 120 },
    data: { label: "Auth Service", sublabel: "JWT · RBAC", color: "#a78bfa" },
  },
  {
    id: "transaction",
    type: "service",
    position: { x: 300, y: 120 },
    data: { label: "Transaction Service", sublabel: "22K TPS · Virtual Threads", color: "#34d399" },
  },
  {
    id: "notification",
    type: "service",
    position: { x: 540, y: 120 },
    data: { label: "Notification Service", sublabel: "SMS · Email · Push", color: "#fb923c" },
  },
  // Layer 2: Messaging
  {
    id: "kafka",
    type: "service",
    position: { x: 300, y: 260 },
    data: { label: "Apache Kafka", sublabel: "Event Bus · Saga Coord.", color: "#fbbf24" },
  },
  // Layer 3: Persistence
  {
    id: "redis",
    type: "service",
    position: { x: 100, y: 380 },
    data: { label: "Redis Cluster", sublabel: "Cache · Dist. Locks", color: "#f87171" },
  },
  {
    id: "postgres",
    type: "service",
    position: { x: 300, y: 380 },
    data: { label: "PostgreSQL", sublabel: "Ledger · Audit Log", color: "#60a5fa" },
  },
  {
    id: "mongo",
    type: "service",
    position: { x: 500, y: 380 },
    data: { label: "MongoDB", sublabel: "Notification Logs", color: "#4ade80" },
  },
  // Observability
  {
    id: "obs",
    type: "service",
    position: { x: 580, y: 260 },
    data: { label: "Observability", sublabel: "Prometheus · Zipkin", color: "#e879f9" },
  },
];

const edges: Edge[] = [
  { id: "gw-auth", source: "gateway", target: "auth", animated: true },
  { id: "gw-tx", source: "gateway", target: "transaction", animated: true },
  { id: "gw-ntf", source: "gateway", target: "notification" },
  { id: "tx-kafka", source: "transaction", target: "kafka", animated: true },
  { id: "kafka-ntf", source: "kafka", target: "notification", animated: true },
  { id: "auth-redis", source: "auth", target: "redis" },
  { id: "tx-redis", source: "transaction", target: "redis" },
  { id: "tx-pg", source: "transaction", target: "postgres" },
  { id: "ntf-mongo", source: "notification", target: "mongo" },
  { id: "tx-obs", source: "transaction", target: "obs", style: { strokeDasharray: "4 4" } },
  { id: "kafka-obs", source: "kafka", target: "obs", style: { strokeDasharray: "4 4" } },
];

export default function ArchitectureDiagram() {
  return (
    <div className="h-[520px] w-full rounded-xl border border-border overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        colorMode="dark"
      >
        <Background gap={24} size={1} />
        <Controls />
        <MiniMap
          nodeColor={(n) => ((n.data as NodeData).color ?? "#60a5fa") + "80"}
          maskColor="rgba(0,0,0,0.5)"
        />
      </ReactFlow>
    </div>
  );
}
