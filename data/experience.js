// Rendered as a git log on the home and about pages.
export const experience = [
  {
    hash: "a7f3e21",
    ref: "HEAD -> main",
    title: "Founding Engineer",
    org: "Mentorgain",
    period: "May 2025 — present",
    place: "Remote",
    summary:
      "A multi-tenant B2B SaaS platform enterprises use to run mentoring programmes end to end: matching, calendar-synced sessions, goals and skill growth, and outcome reporting for HR.",
    points: [
      "Own the platform end to end — backend, mentor and mentee web app, admin consoles, data model, delivery, code review and production support.",
      "Own production and cloud: all AWS infrastructure (RDS, S3, SES, SNS, IAM), deployments, staging, and an account-wide security remediation plan. Authored Atlas migrations across 40+ tables on a live database.",
      "Led SOC 2 and GDPR as the technical lead: PostgreSQL Row-Level Security on every multi-tenant table, CASL role-based access control, privacy controls and audit tooling.",
      "Built the core product: matching on Elasticsearch, session booking with calendar sync, goals and tasks, analytics, multi-program support, badges and community feed.",
      "Built the notification and integration layer: self-hosted Novu behind an orchestrator serving ~200 call sites over email, SMS, Slack and Teams; Microsoft Entra ID SSO and Graph; Rippling HRIS sync; New Relic APM.",
      "Work directly with enterprise customers: technical onboarding, security and vendor-risk questionnaires, and the customer-specific work that unblocked them.",
    ],
    stack: ["TypeScript", "NestJS", "React", "PostgreSQL", "AWS"],
  },
  {
    hash: "3c9d0b4",
    ref: "tag: aws-ccp",
    title: "AWS Certified Cloud Practitioner",
    org: "Amazon Web Services",
    period: "Jan 2024",
    place: "",
    summary: "",
    points: [],
    stack: [],
  },
  {
    hash: "1e2a7f9",
    ref: "",
    title: "B.Tech, Computer Science",
    org: "Vellore Institute of Technology",
    period: "Aug 2021 — Aug 2025",
    place: "Vellore, India",
    summary: "CGPA 8.57. Data structures and algorithms, operating systems, DBMS, computer networks, OOP.",
    points: [],
    stack: [],
  },
];

export const skills = [
  { group: "languages", items: ["TypeScript", "JavaScript", "SQL", "C++"] },
  { group: "backend", items: ["NestJS", "Node.js", "Express", "PostgreSQL (RLS)", "Redis", "Elasticsearch", "MongoDB"] },
  { group: "frontend", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Redux"] },
  { group: "ai & agents", items: ["LangGraph", "LangChain", "MCP", "RAG / GraphRAG", "pgvector", "n8n"] },
  { group: "cloud & devops", items: ["AWS", "Docker", "GitHub Actions", "Nx", "Caddy"] },
  { group: "security & identity", items: ["SOC 2", "GDPR", "SAML 2.0", "OIDC", "SCIM 2.0", "RBAC / CASL"] },
];
