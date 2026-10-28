import Head from "next/head";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, ExternalLink, PlayCircle } from "lucide-react";
import { flagship, getProject } from "../../data/projects";
import { Container, Reveal, Stagger, StaggerItem, StatusDot, Tag, ease } from "../../components/ui";
import VideoPlayer from "../../components/project/VideoPlayer";
import Gallery from "../../components/project/Gallery";
import {
  Architecture,
  Checklist,
  Decisions,
  FeatureGrid,
  FlowSteps,
  ScrollProgress,
  Section,
  Toc,
} from "../../components/project/Sections";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How it works" },
  { id: "features", label: "Features" },
  { id: "architecture", label: "Architecture" },
  { id: "stack", label: "Tech stack" },
  { id: "decisions", label: "Design decisions" },
  { id: "security", label: "Security & quality" },
  { id: "lessons", label: "From production" },
  { id: "screens", label: "Screenshots" },
];

export default function ProjectPage({ slug }) {
  const p = getProject(slug);
  const idx = flagship.findIndex((x) => x.slug === slug);
  const next = flagship[(idx + 1) % flagship.length];
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const links = [
    p.links.live && { href: p.links.live, label: "Live demo", icon: ArrowUpRight, primary: true },
    p.links.demo && { href: p.links.demo, label: "Sample app", icon: ExternalLink },
    p.links.api && { href: p.links.api, label: "API reference", icon: BookOpen },
    p.links.video && { href: p.links.video, label: "Video on Drive", icon: PlayCircle },
  ].filter(Boolean);

  return (
    <>
      <Head>
        <title>{`${p.name} — ${p.tagline} · Atharv Shukla`}</title>
        <meta name="description" content={p.summary} />
        <meta property="og:image" content={p.video.poster} />
      </Head>
      <ScrollProgress color={p.color} />

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden">
        <motion.div
          aria-hidden
          style={{ y: glowY, opacity: glowOpacity, background: `radial-gradient(closest-side, ${p.color}22, transparent)` }}
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2"
        />
        <Container className="relative pb-12 pt-12 md:pt-20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <Link href="/projects" className="group inline-flex items-center gap-2 font-mono text-[13px] text-fg-dim hover:text-fg">
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
              ~/projects/<span style={{ color: p.color }}>{p.slug}</span>
            </Link>
          </motion.div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.5, ease }}
                className="mb-5 flex flex-wrap items-center gap-3"
              >
                <StatusDot color={p.color} label={`${p.status.toLowerCase()} · deployed on AWS`} />
                <span className="font-mono text-[11px] text-fg-faint">/ {p.year}</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7, ease }}
                className="text-5xl font-semibold tracking-tight text-fg md:text-7xl"
              >
                {p.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.6, ease }}
                className="mt-3 text-xl text-fg-muted md:text-2xl"
              >
                {p.tagline}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.6, ease }}
                className="mt-6 max-w-2xl text-pretty leading-relaxed text-fg-muted"
              >
                {p.summary}
              </motion.p>
            </div>

            <motion.dl
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease }}
              className="panel divide-y divide-ink-700 text-sm"
            >
              {[
                ["role", p.role],
                ["status", `${p.status} — public demo`],
                ["hosting", "AWS EC2 · Docker · Caddy"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[84px_1fr] gap-3 px-4 py-3">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-dim">{k}</dt>
                  <dd className="text-fg-muted">{v}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[84px_1fr] gap-3 px-4 py-3">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-fg-dim">stack</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {p.stackLine.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </dd>
              </div>
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.5, ease }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {links.map(({ href, label, icon: Icon, primary }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                  primary ? "text-ink-950 hover:brightness-110" : "border border-ink-600 bg-ink-850 text-fg hover:border-ink-500"
                }`}
                style={primary ? { background: p.color } : undefined}
              >
                {label}
                <Icon size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </motion.div>
          <p className="mt-4 font-mono text-[12px] text-fg-dim">
            <span style={{ color: p.color }}>#</span> {p.demoNote}
          </p>
        </Container>
      </section>

      {/* Demo video */}
      <Container className="pb-10">
        <Reveal>
          <VideoPlayer {...p.video} title={p.name} color={p.color} />
        </Reveal>
      </Container>

      {/* Facts */}
      <Container className="pb-20">
        <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-ink-700 bg-ink-700 md:grid-cols-4">
          {p.facts.map((f) => (
            <StaggerItem key={f.label} className="bg-ink-900 p-5">
              <p className="text-3xl font-semibold tracking-tight" style={{ color: p.color }}>
                {f.value}
              </p>
              <p className="mt-1.5 text-[13px] leading-snug text-fg-dim">{f.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      {/* Body with sticky TOC */}
      <Container>
        <div className="grid gap-12 lg:grid-cols-[200px_1fr]">
          <aside className="hidden lg:block">
            <Toc sections={SECTIONS} color={p.color} />
          </aside>

          <div className="min-w-0">
            <Section id="overview" index="01" label="overview" title="The problem, and the bet">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ["problem", p.problem],
                  ["solution", p.solution],
                ].map(([k, v], i) => (
                  <Reveal key={k} delay={i * 0.06}>
                    <div className="panel h-full p-6">
                      <p className="label mb-3" style={k === "solution" ? { color: p.color } : undefined}>
                        {k}
                      </p>
                      <p className="leading-relaxed text-fg-muted">{v}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Section>

            <Section id="how-it-works" index="02" label="how it works" title="From request to result">
              <FlowSteps steps={p.flow} color={p.color} />
            </Section>

            <Section id="features" index="03" label="features" title="What it does">
              <FeatureGrid features={p.features} color={p.color} />
            </Section>

            <Section id="architecture" index="04" label="architecture" title="How the system fits together">
              <Architecture layers={p.architecture} color={p.color} />
            </Section>

            <Section id="stack" index="05" label="tech stack" title="Built with">
              <Stagger className="grid gap-4 sm:grid-cols-2">
                {p.stack.map((g) => (
                  <StaggerItem key={g.group} className="panel p-5">
                    <p className="label mb-3">{g.group}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {g.items.map((it) => (
                        <Tag key={it}>{it}</Tag>
                      ))}
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </Section>

            <Section id="decisions" index="06" label="design decisions" title="Trade-offs I made on purpose">
              <Decisions decisions={p.decisions} color={p.color} />
            </Section>

            <Section id="security" index="07" label="security & quality" title="Safe by default, tested in CI">
              <div className="grid gap-4 md:grid-cols-2">
                <Checklist title="security" items={p.security} color={p.color} />
                <Checklist title="testing & delivery" items={p.quality} color={p.color} />
              </div>
            </Section>

            <Section id="lessons" index="08" label="from production" title="Bugs worth remembering">
              <div className="space-y-3">
                {p.lessons.map((l, i) => (
                  <Reveal key={l.title} delay={i * 0.05}>
                    <div className="panel grid gap-2 p-5 sm:grid-cols-[180px_1fr] sm:gap-6">
                      <p className="font-mono text-[12px] text-fg">
                        <span style={{ color: p.color }}>fix:</span> {l.title.toLowerCase()}
                      </p>
                      <p className="text-sm leading-relaxed text-fg-muted">{l.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Section>

            <Section id="screens" index="09" label="screenshots" title="Inside the product">
              <Gallery images={p.gallery} slug={p.slug} />
            </Section>
          </div>
        </div>
      </Container>

      {/* Next project */}
      <Container className="mt-16">
        <Reveal>
          <Link
            href={`/projects/${next.slug}`}
            className="group relative block overflow-hidden rounded-2xl border border-ink-700 bg-ink-900 p-8 transition-colors hover:border-ink-500 md:p-12"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60"
              style={{ background: next.color }}
            />
            <p className="label mb-3">next project</p>
            <div className="flex items-end justify-between gap-6">
              <div>
                <h3 className="text-4xl font-semibold tracking-tight text-fg md:text-5xl">{next.name}</h3>
                <p className="mt-2 text-fg-muted">{next.tagline}</p>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink-600 transition-all group-hover:border-transparent group-hover:bg-[var(--c)] group-hover:text-ink-950" style={{ "--c": next.color }}>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </Reveal>
      </Container>
    </>
  );
}

export function getStaticPaths() {
  return { paths: flagship.map((p) => ({ params: { slug: p.slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  return { props: { slug: params.slug } };
}
