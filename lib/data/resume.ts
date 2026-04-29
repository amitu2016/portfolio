import type { Resume } from "@/types";

export const resume: Resume = {
  name: "Amit Kumar Upadhyay",
  title: "Senior Manager — Backend Engineering",
  email: "amitu2016@gmail.com",
  location: "Mumbai, India",
  github: "https://github.com/amitupadhyay",
  linkedin: "https://linkedin.com/in/upadhyayamitk/",

  summary:
    "Results-driven Senior Backend Engineer with nearly 8 years of expertise in designing and deploying cloud-native applications using microservices architecture. Currently leading backend engineering at Indian Private bank, specializing in developing resilient distributed systems and modernizing legacy architectures. Proficient in Java, Spring Boot, and enterprise-grade observability.",

  experience: [
    {
      company: "Indian Private bank",
      role: "Senior Manager — Backend Engineering",
      period: "July 2025 – Present",
      location: "Mumbai, India",
      description:
        "Spearheading development of distributed microservices and leading Proof of Concepts (POCs) for innovative banking solutions at one of India's largest private banks.",
      highlights: [
        "Architected a custom Resilience & Utility Library to standardize cross-cutting concerns, resolving stability issues across multiple microservices.",
        "Implemented automated Database Warmup routines to initialize connection pools, effectively eliminating cold-start latency.",
        "Integrated configurable retry mechanisms and exponential backoff strategies to enhance fault tolerance across services.",
        "Developed standardized observability hooks and configured Prometheus/Grafana dashboards for real-time monitoring.",
        "Leading Proof of Concepts (POCs) for innovative banking solutions leveraging modern distributed system patterns.",
      ],
      tech: [
        "Java",
        "Spring Boot",
        "Prometheus",
        "Grafana",
        "PostgreSQL",
        "Kubernetes",
        "Docker",
        "Kafka",
      ],
    },
    {
      company: "CDAC Mumbai",
      role: "Technical Lead",
      period: "March 2018 – June 2025",
      location: "Mumbai, India",
      description:
        "Led a team of engineers modernizing monolithic government and enterprise systems, migrating to cloud-native microservices architecture on Kubernetes over 7+ years.",
      highlights: [
        "Led the modernization of monolithic systems by migrating to microservices architecture deployed on Kubernetes, improving scalability and deployment velocity.",
        "Containerized applications using Docker and orchestrated deployments to accelerate delivery cycles.",
        "Implemented robust CI/CD pipelines with Jenkins and Git, integrating DevOps best practices to streamline delivery.",
        "Developed secure, high-performance APIs with OAuth 2.0 and JWT authentication for third-party integrations.",
        "Enhanced system observability via ELK stack, improving log management and reducing incident resolution time.",
        "Mentored junior developers and conducted code reviews, resulting in measurable improvements in team productivity.",
      ],
      tech: [
        "Java",
        "Spring Boot",
        "Spring Security",
        "OAuth 2.0",
        "JWT",
        "Kubernetes",
        "Docker",
        "Jenkins",
        "ELK Stack",
        "PostgreSQL",
        "Kafka",
        "RabbitMQ",
      ],
    },
  ],

  skills: {
    "Languages & Frameworks": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "Spring Security",
      "Spring Cloud",
      "RESTful APIs",
    ],
    "Cloud & DevOps": [
      "Docker",
      "Kubernetes",
      "AWS",
      "Azure",
      "GCP",
      "Helm Charts",
      "Jenkins",
      "CI/CD",
    ],
    "Data & Observability": [
      "PostgreSQL",
      "Yugabyte DB",
      "Kafka",
      "RabbitMQ",
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
      "ELK Stack",
    ],
    "Core Engineering": [
      "System Design",
      "Distributed Systems",
      "Performance Optimization",
      "Root Cause Analysis",
    ],
  },

  education: [
    {
      institution: "University of Pune",
      degree: "B.Tech in Electronics and Telecommunication Engineering",
      period: "2016",
    },
  ],

  certifications: [
    {
      name: "Post Graduate Diploma in Advanced Computing (PG-DAC)",
      issuer: "CDAC",
      year: 2018,
    },
  ],
};
