import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "resilience-utility-lib",
    title: "Resilience & Utility Library",
    description:
      "Custom shared library standardizing cross-cutting concerns — retry, exponential backoff, circuit breakers, and observability hooks — across banking microservices at HDFC Bank.",
    longDescription:
      "Architected at HDFC Bank to resolve stability issues across multiple microservices. Provides a configurable retry engine with exponential backoff, Resilience4j circuit breakers, standardized Prometheus/Grafana observability hooks, and automated Database Warmup routines that eliminated cold-start latency across all dependent services.",
    tech: ["Java", "Spring Boot", "Resilience4j", "Prometheus", "Grafana", "PostgreSQL"],
    category: "backend",
    featured: true,
    metrics: "Eliminated cold-start latency · Multi-service stability fix",
  },
  {
    id: "db-warmup",
    title: "Automated Database Warmup",
    description:
      "Connection pool initialization routines that pre-warm database connections at service startup, eliminating cold-start latency in production banking systems.",
    longDescription:
      "Implemented at HDFC Bank to solve cold-start latency spikes observed when microservices were scaled or restarted. The warmup routine pre-initialises HikariCP connection pools and executes lightweight validation queries against PostgreSQL and Yugabyte DB, ensuring the first real transaction sees a warm pool.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Yugabyte DB", "HikariCP"],
    category: "backend",
    featured: true,
    metrics: "Cold-start latency → 0 · Production banking grade",
  },
  {
    id: "microservices-migration",
    title: "Monolith → Microservices Migration",
    description:
      "Led end-to-end migration of monolithic systems to Kubernetes-deployed microservices at CDAC, containerizing apps and establishing CI/CD pipelines.",
    longDescription:
      "Over 7 years at CDAC Mumbai, led the architectural decomposition of monolithic applications into domain-aligned microservices. Set up Docker containerisation, Kubernetes orchestration with Helm Charts, and Jenkins-based CI/CD pipelines. Result was significantly faster delivery cycles and independent scalability per service.",
    tech: ["Java", "Spring Boot", "Kubernetes", "Docker", "Helm", "Jenkins", "Git"],
    category: "devops",
    featured: true,
    metrics: "Accelerated delivery cycles · Full K8s orchestration",
  },
  {
    id: "secure-api-platform",
    title: "Secure API Platform (OAuth 2.0 + JWT)",
    description:
      "Designed and built high-performance APIs with OAuth 2.0 and JWT authentication for third-party integrations at CDAC.",
    longDescription:
      "Developed a centralized API gateway layer at CDAC using Spring Security, Spring Cloud Gateway, OAuth 2.0 authorization flows, and JWT token management. Supported multiple grant types for internal and third-party consumers, with rate limiting and audit logging built in.",
    tech: ["Java", "Spring Security", "Spring Cloud", "OAuth 2.0", "JWT", "PostgreSQL"],
    category: "backend",
    featured: false,
    metrics: "Secure third-party integrations · Enterprise auth",
  },
  {
    id: "elk-observability",
    title: "ELK Stack Observability Platform",
    description:
      "Built centralized log management and observability using the ELK Stack at CDAC, reducing incident resolution time across distributed services.",
    longDescription:
      "Designed and rolled out an ELK (Elasticsearch, Logstash, Kibana) stack to centralize logs from all microservices at CDAC. Established structured logging standards, built Kibana dashboards for service health and error tracking, and created alert rules that significantly reduced incident detection and resolution time.",
    tech: ["Elasticsearch", "Logstash", "Kibana", "Docker", "Spring Boot", "Kafka"],
    category: "devops",
    featured: false,
    metrics: "Reduced incident resolution time · Centralized logging",
  },
  {
    id: "observability-hooks",
    title: "Prometheus + Grafana Dashboards",
    description:
      "Standardized observability hooks across microservices at HDFC Bank with real-time Prometheus metrics and Grafana dashboards.",
    longDescription:
      "Developed a standard observability library at HDFC Bank that auto-instruments every microservice with Prometheus metrics (JVM, HTTP, DB connection pool, custom business metrics). Configured Grafana dashboards for real-time monitoring of service health, latency histograms, and error rates across the banking platform.",
    tech: ["Prometheus", "Grafana", "Micrometer", "Spring Boot Actuator", "OpenTelemetry"],
    category: "devops",
    featured: false,
    metrics: "Real-time monitoring · Standardized across services",
  },
];
