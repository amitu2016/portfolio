export const siteConfig = {
  name: "Amit Kumar Upadhyay",
  title: "Amit Kumar Upadhyay — Senior Backend Engineer",
  description:
    "Nearly 8 years of expertise in Java, Spring Boot, and cloud-native distributed systems. Senior Manager at Indian Private bank, specializing in resilient microservices and enterprise observability.",
  url: "https://amitupadhyay.co.in",
  github: "https://github.com/amitu2016",
  linkedin: "https://linkedin.com/in/upadhyayamitk/",
  email: "amitu2016@gmail.com",
  medium: "https://medium.com/@amitu2016",
  resumeUrl: "/resume.pdf",

  nav: [
    { label: "About", href: "#about" },
    { label: "System Design", href: "#system-design" },
    { label: "Observability", href: "#observability" },
    { label: "Projects", href: "#projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "#contact" },
  ],

  meta: {
    openGraph: {
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
    },
  },
} as const;
