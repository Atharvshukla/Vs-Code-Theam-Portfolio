import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, FileText, Command } from "lucide-react";
import { flagship } from "../data/projects";
import { experience, skills } from "../data/experience";
import blogPosts from "../data/blog";
import integrations from "../data/integrations";
import { incidents } from "../data/incidents";
import { Button, Container, Reveal, SectionHeader, Stagger, StaggerItem, StatusDot, Window, ease } from "../components/ui";
import Terminal from "../components/Terminal";
import GitLog from "../components/GitLog";
import { site } from "../components/site";

const MARQUEE = [
  "TypeScript", "NestJS", "React", "PostgreSQL", "pgvector", "LangGraph", "MCP", "AWS", "Docker",
  "SAML 2.0", "OIDC", "SCIM 2.0", "Row-Level Security", "SOC 2", "GDPR", "n8n", "Tailwind", "Framer Motion",
];

const PRINCIPLES = [
  ["Own the outcome, not the ticket.", "Shipping is the start. I stay on call for what I build and fix the class of bug, not the instance."],
  ["Boring technology, sharp edges removed.", "Postgres before a new database. One deploy path. Fewer moving parts that each do one thing well."],
  ["Security is a product feature.", "RLS, audit trails and least privilege go in on day one, because enterprise deals depend on them."],
  ["Write it down.", "ADRs, runbooks and postmortems turn one person's context into the team's."],
];

function Hero() {
  return (
    <section className="relative">
      <Container className="grid items-center gap-14 pb-20 pt-14 md:pt-24 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-ink-700 bg-ink-900/80 py-1.5 pl-3 pr-4"
          >
            <StatusDot label="" />
            <span className="font-mono text-[12px] text-fg-muted">
              founding engineer <span className="text-fg-faint">@</span> mentorgain
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease }}
            className="text-balance text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-fg sm:text-6xl lg:text-[4.2rem]"
          >
            I take products from an empty repo to{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 text-accent">production</span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease }}
                className="absolute inset-x-0 bottom-1 -z-0 h-3 origin-left bg-accent/15"
              />
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-fg-muted"
          >
            I&apos;m <span className="text-fg">Atharv Shukla</span>. At Mentorgain I own a multi-tenant B2B platform end to
            end — architecture, backend, web, AWS and SOC&nbsp;2. On the side I build and ship my own products: an agentic AI
            platform, an enterprise identity API and a security-review copilot.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button href="/projects">See the work</Button>
            <Button href={site.resume} variant="secondary" external>
              <FileText size={15} /> Resume
            </Button>
            <span className="ml-1 hidden items-center gap-1.5 font-mono text-[12px] text-fg-dim sm:flex">
              or press
              <kbd className="inline-flex items-center gap-0.5 rounded border border-ink-600 bg-ink-850 px-1.5 py-0.5 text-[11px] text-fg-muted">
                <Command size={10} />K
              </kbd>
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          style={{ transformPerspective: 1200 }}
        >
          <Terminal />
        </motion.div>
      </Container>

      <div className="relative overflow-hidden border-y border-ink-700 bg-ink-900/50 py-3.5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-950 to-transparent" />
        <div className="flex w-max animate-marquee gap-10 font-mono text-[13px] text-fg-dim hover:[animation-play-state:paused]">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              {t} <span className="text-fg-faint">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <Container className="py-24 md:py-32">
      <SectionHeader
        index="01"
        label="selected work"
        title="Three products, live in production."
        description="Each one designed, built, tested and deployed by me — with a public demo, a narrated video and a full case study."
        action={
          <Link href="/projects" className="group hidden items-center gap-1.5 font-mono text-[13px] text-fg-dim hover:text-fg md:flex">
            ls ~/projects <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        }
      />
      <Stagger className="grid gap-5 md:grid-cols-3">
        {flagship.map((p, i) => (
          <StaggerItem key={p.slug}>
            <Link href={`/projects/${p.slug}`} className="group block h-full">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="panel relative flex h-full flex-col overflow-hidden transition-colors group-hover:border-ink-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-ink-700 bg-black">
                  <img
                    src={p.video.poster}
                    alt={`${p.name} preview`}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: `linear-gradient(to top, ${p.color}33, transparent 60%)` }}
                  />
                  <span className="absolute left-3 top-3 rounded-md border border-white/10 bg-black/60 px-2 py-1 font-mono text-[10px] text-white/80 backdrop-blur">
                    {String(i + 1).padStart(2, "0")} / {p.slug}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold tracking-tight text-fg">{p.name}</h3>
                    <StatusDot color={p.color} label="live" />
                  </div>
                  <p className="mt-1 text-sm text-fg-muted">{p.tagline}</p>
                  <p className="mt-4 flex-1 font-mono text-[11px] leading-relaxed text-fg-dim">{p.stackLine.slice(0, 5).join(" · ")}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors group-hover:text-fg">
                    Case study + demo
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  );
}

function Experience() {
  return (
    <Container className="py-24">
      <SectionHeader
        index="02"
        label="git log --experience"
        title="Where I've been committing."
        action={
          <Link href="/about" className="group hidden items-center gap-1.5 font-mono text-[13px] text-fg-dim hover:text-fg md:flex">
            cat ~/about.md <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        }
      />
      <GitLog entries={experience} compact />
    </Container>
  );
}

function Stack() {
  return (
    <Container className="py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <SectionHeader
            index="03"
            label="how i work"
            title="Principles I bring to a founding team."
            className="mb-8"
          />
          <Stagger as="ol" className="space-y-6">
            {PRINCIPLES.map(([t, d], i) => (
              <StaggerItem as="li" key={t} className="grid grid-cols-[32px_1fr] gap-3">
                <span className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-medium text-fg">{t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1}>
          <Window title="~/atharv/stack.json" bodyClassName="overflow-x-auto p-5 font-mono text-[12.5px] leading-[1.9]">
            <p className="text-fg-dim">{"{"}</p>
            {skills.map((g, gi) => (
              <p key={g.group} className="pl-4">
                <span className="text-sky-300/90">&quot;{g.group}&quot;</span>
                <span className="text-fg-dim">: [</span>
                {g.items.map((it, i) => (
                  <span key={it}>
                    <span className="text-amber-200/90">&quot;{it}&quot;</span>
                    {i < g.items.length - 1 && <span className="text-fg-dim">, </span>}
                  </span>
                ))}
                <span className="text-fg-dim">]{gi < skills.length - 1 ? "," : ""}</span>
              </p>
            ))}
            <p className="text-fg-dim">{"}"}</p>
          </Window>
        </Reveal>
      </div>
    </Container>
  );
}

function Writing() {
  const columns = [
    {
      label: "blog",
      href: "/blog",
      items: [...blogPosts]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 3)
        .map((p) => ({ href: `/blog/${p.slug}`, title: p.title, meta: p.date })),
    },
    {
      label: "guides",
      href: "/integrations",
      items: integrations.slice(0, 3).map((g) => ({ href: `/integrations/${g.slug}`, title: g.title, meta: g.platform })),
    },
    {
      label: "postmortems",
      href: "/incidents",
      items: incidents.slice(0, 3).map((c) => ({ href: "/incidents", title: c.title, meta: `${c.id} · ${c.severity}` })),
    },
  ];

  return (
    <Container className="py-24">
      <SectionHeader
        index="04"
        label="writing"
        title="Notes from building in production."
        description="Engineering write-ups on founding-engineer life, enterprise integrations, incidents and compliance."
      />
      <Stagger className="grid gap-5 md:grid-cols-3">
        {columns.map((col) => (
          <StaggerItem key={col.label} className="panel flex flex-col">
            <div className="flex items-center justify-between border-b border-ink-700 px-5 py-3">
              <p className="font-mono text-[12px] text-fg-muted">
                <span className="text-fg-faint">~/</span>
                {col.label}
              </p>
              <Link href={col.href} className="font-mono text-[11px] text-fg-dim hover:text-accent">
                all →
              </Link>
            </div>
            <ul className="flex-1 divide-y divide-ink-700">
              {col.items.map((it) => (
                <li key={it.title}>
                  <Link href={it.href} className="group block px-5 py-4 transition-colors hover:bg-ink-850">
                    <p className="font-mono text-[11px] text-fg-dim">{it.meta}</p>
                    <p className="mt-1 text-[14px] leading-snug text-fg-muted transition-colors group-hover:text-fg">{it.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  );
}

function Contact() {
  return (
    <Container className="py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-ink-700 bg-ink-900 p-8 md:p-14">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-60" />
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
            <div>
              <p className="label mb-4">
                <span className="text-accent">05</span> <span className="text-fg-faint">//</span> contact
              </p>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg md:text-5xl">
                Building something that has to work in production?
              </h2>
              <p className="mt-5 max-w-lg leading-relaxed text-fg-muted">
                I like early teams, hard problems and owning the result. The fastest way to reach me is email.
              </p>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border border-ink-700 bg-ink-950 p-4 font-mono text-[12.5px]">
                <p className="text-fg-dim">
                  <span className="text-accent">$</span> mail -s &quot;hello&quot; \
                </p>
                <p className="break-all pl-4 text-fg">{site.email}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href={`mailto:${site.email}`} variant="accent" icon={false}>
                  Send an email
                </Button>
                <Button href={site.linkedin} variant="secondary" external>
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Atharv Shukla — Founding Engineer</title>
      </Head>
      <Hero />
      <Work />
      <Experience />
      <Stack />
      <Writing />
      <Contact />
    </>
  );
}
