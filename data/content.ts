/**
 * All site copy lives here. Edit this file to update text, projects,
 * experience, skills and testimonials — components read from it directly.
 */

export type SocialLink = {
  label: string;
  href: string;
  icon: "mail" | "linkedin" | "github" | "upwork";
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  liveUrl: string;
  /** Optional secondary link, e.g. an npm package. */
  extraLink?: { label: string; href: string };
  image: { src: string; alt: string };
  tags: string[];
  problem: string;
  built: string[];
  results: string[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
};

export type SkillGroup = {
  name: string;
  items: string[];
};

export type Service = {
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  author: string;
};

export const profile = {
  name: "Muhammad Amir",
  firstName: "Amir",
  title: "Senior Full-Stack Developer",
  location: "Lahore, Pakistan",
  locationNote: "Working remotely with clients worldwide",
  yearsOfExperience: "8+",
  email: "mamir.se@gmail.com",
  mainStack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  education: {
    degree: "B.E. Software Engineering",
    school: "NUST Islamabad",
    period: "2016 – 2020",
  },
  achievement: "2nd place, NUST SPEED Programming Contest (2017)",
} as const;

export const seo = {
  title: "Muhammad Amir — Senior Full-Stack Developer (Next.js, React, Node.js)",
  shortTitle: "Muhammad Amir",
  description:
    "Senior full-stack developer with 8+ years building fast, scalable web apps, SaaS platforms and admin dashboards with Next.js, React, Node.js and PostgreSQL. Hire a Top Rated Plus Next.js developer.",
  keywords: [
    "senior full-stack developer",
    "Next.js developer",
    "React developer",
    "hire Next.js developer",
    "SaaS developer",
    "Node.js developer",
    "TypeScript developer",
  ],
};

export const hero = {
  headline: "I build fast, scalable web apps for growing businesses",
  subline: "Senior Full-Stack Developer | React, Next.js, Node.js, PostgreSQL",
  primaryCta: { label: "Book a call", href: "#contact" },
  secondaryCta: { label: "See my work", href: "#work" },
  badges: ["Top Rated Plus", "100% Job Success", "6,000+ hours"],
};

export const upworkStats = [
  { label: "Upwork status", value: "Top Rated Plus" },
  { label: "Job Success", value: "100%" },
  { label: "Rating", value: "5.0" },
  { label: "Hours billed", value: "6,000+" },
  { label: "Jobs completed", value: "23" },
];

export const socials: SocialLink[] = [
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-amir-00a04112a/",
    icon: "linkedin",
  },
  { label: "GitHub", href: "https://github.com/im-amir", icon: "github" },
  {
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~0193e5107b52171fab",
    icon: "upwork",
  },
];

export const projects: Project[] = [
  {
    slug: "analitix",
    title: "Analitix.ai",
    tagline: "AI-powered CCTV business intelligence",
    summary:
      "Designed the database, admin panel and landing page, and built live analytics for admins with Hasura.",
    liveUrl: "https://analitix.ai",
    image: {
      src: "/projects/analitix.png",
      alt: "Analitix.ai analytics dashboard showing live CCTV business insights",
    },
    tags: ["Next.js", "Hasura", "GraphQL", "PostgreSQL"],
    problem:
      "Businesses already have CCTV cameras, but the footage rarely turns into decisions. Analitix.ai needed a platform that turns AI video insights into clear, live business analytics — plus the admin tooling to run it.",
    built: [
      "Designed the PostgreSQL database schema for customers, locations, cameras and analytics events.",
      "Built the admin panel for managing customers, sites and platform data.",
      "Built live analytics dashboards for admins using Hasura GraphQL subscriptions.",
      "Designed and built the marketing landing page.",
    ],
    results: [
      "Admins see analytics update live, without refreshing or waiting for reports.",
      "A single data model powers both the admin panel and the analytics views.",
      "A fast, SEO-friendly landing page that explains the product to prospects.",
    ],
  },
  {
    slug: "ekonobar",
    title: "eKonobar",
    tagline: "Hospitality and POS platform for restaurants in Croatia",
    summary:
      "Built the landing site and a full admin panel for inventory, staff, articles, payments and orders.",
    liveUrl: "https://ekonobar.hr",
    image: {
      src: "/projects/ekonobar.png",
      alt: "eKonobar restaurant admin panel with orders and inventory",
    },
    tags: ["Next.js", "React", "TypeScript", "Hasura"],
    problem:
      "Restaurant owners juggle inventory, staff, menus, payments and orders across disconnected tools. eKonobar needed one admin panel that ties the whole operation together alongside its POS.",
    built: [
      "Built the public landing site in Next.js.",
      "Built a full admin panel covering inventory, staff, articles, payments and orders.",
      "Connected the admin panel to the platform's Hasura GraphQL backend.",
      "Created typed, reusable React components shared across admin modules.",
    ],
    results: [
      "Restaurant owners manage their day-to-day operations from one place.",
      "A consistent, typed component library speeds up new admin features.",
    ],
  },
  {
    slug: "attune",
    title: "Attune",
    tagline: "SaaS lending platform for banks",
    summary:
      "Redesigned the loan management dashboard, built PDF export, and made reusable components for multiple bank integrations.",
    liveUrl: "https://getattune.com",
    image: {
      src: "/projects/attune.png",
      alt: "Attune loan management dashboard for banks",
    },
    tags: ["React", "React Hook Form"],
    problem:
      "Banks using Attune needed a clearer loan management experience, a way to export loan data as documents, and a frontend that could adapt to each bank's integration without rewriting screens.",
    built: [
      "Redesigned the loan management dashboard for clarity and speed.",
      "Built PDF export for loan data and documents.",
      "Built reusable form and UI components with React Hook Form, shared across multiple bank integrations.",
    ],
    results: [
      "A cleaner dashboard for loan officers to review and manage applications.",
      "New bank integrations reuse existing components instead of starting from scratch.",
    ],
  },
  {
    slug: "sdp-split",
    title: "SDP Split",
    tagline: "News, elections and live voting platform",
    summary:
      "Built the website and admin panel for news, elections and live voting, connected to a mobile app.",
    liveUrl: "https://sdp.hr",
    image: {
      src: "/projects/sdp-split.png",
      alt: "SDP Split website with news and live voting",
    },
    tags: ["Next.js", "React"],
    problem:
      "SDP Split needed a public website and an admin panel to publish news, run elections and handle live voting — all in sync with their existing mobile app.",
    built: [
      "Built the public website in Next.js.",
      "Built the admin panel for news, elections and live voting.",
      "Connected the web platform to the mobile app so both share the same data.",
    ],
    results: [
      "Editors publish news and run votes from one admin panel.",
      "Web and mobile users see the same content and voting data.",
    ],
  },
  {
    slug: "holdgate",
    title: "HoldGate",
    tagline: "Human approval for AI agent actions",
    summary:
      "Open-source MCP proxy that holds AI agent actions until a human approves them from their phone.",
    liveUrl: "https://github.com/im-amir/holdgate",
    extraLink: {
      label: "npm: holdgate-proxy",
      href: "https://www.npmjs.com/package/holdgate-proxy",
    },
    image: {
      src: "/projects/holdgate.png",
      alt: "HoldGate mobile app showing an AI agent action awaiting approval",
    },
    tags: ["TypeScript", "Next.js", "Supabase", "Expo", "MCP"],
    problem:
      "AI agents can now take real actions — sending emails, changing data, spending money. Teams need a safety layer so risky actions wait for a human to approve them first.",
    built: [
      "Built an MCP proxy that intercepts agent tool calls and holds them for approval.",
      "Built a TypeScript SDK for integrating HoldGate into existing agents.",
      "Built the Next.js API and web dashboard, backed by Supabase.",
      "Built an Expo mobile app to approve or reject actions from your phone.",
    ],
    results: [
      "Published as open source on GitHub and on npm as holdgate-proxy.",
      "Drop-in human-in-the-loop approval for any MCP-compatible agent.",
    ],
  },
];

export const services: Service[] = [
  {
    title: "Full-stack web apps",
    description:
      "Production-ready web applications with Next.js, React and Node.js — built to be fast, secure and easy to grow.",
  },
  {
    title: "Admin panels and dashboards",
    description:
      "Internal tools and live dashboards that let your team manage data, users and operations without friction.",
  },
  {
    title: "SaaS and multi-tenant systems",
    description:
      "SaaS products with multi-tenant data models, roles and permissions, and integrations with your customers' systems.",
  },
  {
    title: "AI features",
    description:
      "OpenAI and Claude API integrations, AI agents and MCP tooling that add real value to your product.",
  },
  {
    title: "Codebase takeovers and fixes",
    description:
      "Inherited a messy or stalled project? I get up to speed fast, fix what's broken and get it shipping again.",
  },
  {
    title: "React Native mobile apps",
    description:
      "Cross-platform iOS and Android apps with React Native and Expo, sharing logic with your web app.",
  },
];

export const experience: Experience[] = [
  {
    company: "eKonobar d.o.o.",
    role: "Full-Stack Developer (Next.js / Hasura)",
    period: "Dec 2024 – Present",
    location: "Croatia (Remote)",
  },
  {
    company: "Attify Inc.",
    role: "MERN Stack Developer",
    period: "Dec 2022 – Nov 2024",
    location: "India (Remote)",
  },
  {
    company: "Attune",
    role: "Senior Frontend Developer",
    period: "Apr 2021 – Dec 2022",
    location: "India (Remote)",
  },
  {
    company: "InvoZone",
    role: "Full-Stack Developer",
    period: "Sep 2020 – Nov 2021",
    location: "Lahore",
  },
];

export const skills: SkillGroup[] = [
  {
    name: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "TanStack Query", "Refine"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Express", "REST", "GraphQL", "Hasura", "Socket.io", "Auth0"],
  },
  { name: "Databases", items: ["PostgreSQL", "Supabase", "MongoDB", "MySQL", "Firebase"] },
  { name: "Mobile", items: ["React Native", "Expo", "Flutter"] },
  { name: "AI", items: ["OpenAI API", "MCP", "AI agents", "Claude Code"] },
  { name: "Tools", items: ["Git", "GitHub", "GitLab", "AWS", "Vercel"] },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Muhammad was excellent to work with. He understood the requirements quickly, communicated clearly throughout the project, and delivered high-quality work on time.",
    author: "Upwork client",
  },
  {
    quote: "Amir is one of the more dependable freelancers I have worked with.",
    author: "Upwork client",
  },
  {
    quote:
      "Muhammad was a great guy to work with and delivered above and beyond what was expected.",
    author: "Upwork client",
  },
];

export const contact = {
  heading: "Have a project in mind? Let's talk.",
  intro:
    "Tell me a bit about what you're building and your timeline. I read every message personally.",
  budgets: [
    "Under $5,000",
    "$5,000 – $15,000",
    "$15,000 – $50,000",
    "$50,000+",
    "Not sure yet",
  ],
  successMessage: "Thanks! Your message is on its way. I'll get back to you soon.",
};

export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];
