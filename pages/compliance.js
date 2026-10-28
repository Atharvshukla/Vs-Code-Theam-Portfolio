import { useMemo, useState } from "react";
import Head from "next/head";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { BadgeCheck, CheckCircle2, ChevronDown, Circle, Cloud, GitCommit, Shield } from "lucide-react";
import { Container, PageHeader, Reveal, SectionHeader, Stagger, StaggerItem, Tag, Window, ease } from "../components/ui";
import { complianceThreads, complianceStats, phases, complianceStories } from "../data/compliance";

const storyIcons = { shield: Shield, cloud: Cloud };

const severityStyles = {
  critical: "border-red-500/40 bg-red-500/10 text-red-400",
  high: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  medium: "border-ink-500 bg-ink-800 text-fg-muted",
};

function isDone(status) {
  return status === "completed";
}

function Checklist({ items, done = true }) {
  return (
    <ul className="space-y-2">
      {items.map((text) => (
        <li key={text} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
          {done ? (
            <CheckCircle2 size={15} className="mt-[3px] shrink-0 text-accent" />
          ) : (
            <Circle size={15} className="mt-[3px] shrink-0 text-fg-faint" />
          )}
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

/** Phases rendered as a roadmap with per-phase progress. */
function Roadmap() {
  return (
    <Reveal>
      <div className="grid gap-px overflow-hidden rounded-xl border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-4">
        {phases.map((phase, i) => {
          const threads = complianceThreads.filter((t) => t.phase === phase.name);
          const done = threads.filter((t) => isDone(t.status)).length;
          const pct = threads.length ? (done / threads.length) * 100 : 0;
          return (
            <div key={phase.name} className="bg-ink-900 p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-fg-dim">phase {String(i + 1).padStart(2, "0")}</span>
                <span className="font-mono text-[11px] text-fg-dim">
                  {done}/{threads.length}
                </span>
              </div>
              <p className="mt-3 font-semibold text-fg">{phase.name}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-dim">{phase.description}</p>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-ink-700">
                <motion.div
                  className="h-full rounded-full bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1 * i, ease }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}

function ThreadEntry({ thread }) {
  const done = isDone(thread.status);
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease }}
      className="relative pl-8"
    >
      <span className="absolute left-0 top-5 grid h-[17px] w-[17px] place-items-center rounded-full border border-ink-600 bg-ink-950">
        <GitCommit size={11} className={done ? "text-accent" : "text-amber-400"} />
      </span>
      <div className="panel panel-hover p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
          <span className="text-fg-dim">#{String(thread.id).padStart(3, "0")}</span>
          <span className="text-fg-faint">·</span>
          <span className="text-fg-dim">{thread.date}</span>
          <span className="text-fg-faint">·</span>
          <span className="text-fg-dim">{thread.phase.toLowerCase()}</span>
          <span
            className={`ml-auto rounded-md border px-2 py-0.5 ${
              done ? "border-accent/30 bg-accent/10 text-accent" : "border-amber-500/30 bg-amber-500/10 text-amber-400"
            }`}
          >
            {done ? "completed" : thread.status}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-fg">{thread.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{thread.content}</p>
        <div className="mt-5">
          <p className="label mb-3">key decisions</p>
          <Checklist items={thread.keyDecisions} done={done} />
        </div>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {thread.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </motion.li>
  );
}

function Threads() {
  const [active, setActive] = useState("All");
  const tabs = ["All", ...phases.map((p) => p.name)];
  const visible = useMemo(
    () => (active === "All" ? complianceThreads : complianceThreads.filter((t) => t.phase === active)),
    [active]
  );

  return (
    <section className="mt-20">
      <SectionHeader
        index="02"
        label="log"
        title="The engineering log"
        description="Every thread of work, in order, with the decisions that came out of it."
      />
      <LayoutGroup>
        <div className="-mx-5 mb-8 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <div className="inline-flex gap-1 rounded-lg border border-ink-700 bg-ink-900 p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`relative whitespace-nowrap rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${
                  active === tab ? "text-fg" : "text-fg-dim hover:text-fg"
                }`}
              >
                {active === tab && (
                  <motion.span
                    layoutId="compliance-tab"
                    className="absolute inset-0 rounded-md border border-ink-600 bg-ink-800"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative">{tab.toLowerCase()}</span>
              </button>
            ))}
          </div>
        </div>
        <ol className="relative space-y-4 before:absolute before:bottom-4 before:left-[8px] before:top-4 before:w-px before:bg-ink-700">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((thread) => (
              <ThreadEntry key={thread.id} thread={thread} />
            ))}
          </AnimatePresence>
        </ol>
      </LayoutGroup>
    </section>
  );
}

function SubStory({ sub }) {
  return (
    <div className="mt-8">
      <h4 className="font-semibold text-fg">{sub.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{sub.overview}</p>
      <div className="mt-4 space-y-3">
        {sub.threads.map((t) => (
          <div key={t.title} className="rounded-lg border border-ink-700 bg-ink-950/60 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase ${
                  severityStyles[t.severity] || severityStyles.medium
                }`}
              >
                {t.severity}
              </span>
              {t.date && <span className="font-mono text-[11px] text-fg-dim">{t.date}</span>}
            </div>
            <p className="mt-2.5 font-medium text-fg">{t.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{t.content}</p>
            {t.fixes?.length > 0 && (
              <div className="mt-4">
                <Checklist items={t.fixes} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Story({ story, open, onToggle }) {
  const Icon = storyIcons[story.icon] || Shield;
  const subCount = story.subStories?.length || 0;
  const threadCount = story.subStories?.reduce((n, s) => n + s.threads.length, 0) || 0;
  return (
    <motion.article layout="position" className="panel overflow-hidden">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start gap-4 p-5 text-left transition-colors hover:bg-ink-850 sm:p-6"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-ink-600 bg-ink-850 text-accent">
          <Icon size={17} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-fg-dim">
            <span>{story.date}</span>
            {story.chapters?.length > 0 && <span>{story.chapters.length} chapters</span>}
            {subCount > 0 && (
              <span>
                {subCount} stories · {threadCount} issues
              </span>
            )}
          </div>
          <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-fg">{story.title}</h3>
          <p className="mt-1 text-sm text-fg-muted">{story.subtitle}</p>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-ink-600 text-fg-dim"
        >
          <ChevronDown size={15} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <div className="border-t border-ink-700 p-5 sm:p-6">
              <p className="text-sm leading-relaxed text-fg-muted">{story.overview}</p>
              {story.chapters?.length > 0 && (
                <ol className="mt-8 space-y-8">
                  {story.chapters.map((ch, i) => (
                    <li key={ch.title} className="grid gap-3 sm:grid-cols-[48px_1fr]">
                      <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h4 className="font-semibold text-fg">{ch.title}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{ch.content}</p>
                        {ch.actions?.length > 0 && (
                          <div className="mt-4">
                            <Checklist items={ch.actions} />
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              )}
              {story.subStories?.map((sub) => (
                <SubStory key={sub.id} sub={sub} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function DeepDives() {
  const [openId, setOpenId] = useState(null);
  return (
    <section className="mt-24">
      <SectionHeader
        index="03"
        label="deep dives"
        title="Deep-dive stories"
        description="The two areas that took the most engineering: proving data rights work end to end, and closing cloud security gaps."
      />
      <Stagger className="space-y-4">
        {complianceStories.map((story) => (
          <StaggerItem key={story.id}>
            <Story
              story={story}
              open={openId === story.id}
              onToggle={() => setOpenId(openId === story.id ? null : story.id)}
            />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function Status() {
  const badges = [
    { name: "SOC2 Type II", status: "Certified (via Scrut)" },
    { name: "GDPR", status: "Compliant (via Scrut)" },
  ];
  return (
    <section className="mt-24">
      <SectionHeader index="04" label="status" title="Compliance status" />
      <Stagger className="grid gap-4 sm:grid-cols-2">
        {badges.map((b) => (
          <StaggerItem key={b.name} className="panel flex items-center gap-4 p-5">
            <span className="grid h-11 w-11 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
              <BadgeCheck size={20} />
            </span>
            <div>
              <p className="font-semibold text-fg">{b.name}</p>
              <p className="font-mono text-xs text-accent">{b.status}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

export default function Compliance() {
  return (
    <>
      <Head>
        <title>SOC2 & GDPR Compliance — Atharv Shukla</title>
        <meta
          name="description"
          content="How I made Mentorgain SOC2 Type II and GDPR compliant — the full engineering chronicle."
        />
      </Head>

      <PageHeader
        path="compliance"
        title="A practical guide to SOC 2 & GDPR compliance"
        description="A step-by-step engineering guide to making a B2B SaaS platform SOC2 Type II and GDPR compliant using Scrut Automation — from first audit to certification in ~90 days."
      >
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-fg-dim">
          <span>{complianceThreads.length} threads</span>
          <span>90-day journey</span>
          <span className="text-accent">● ongoing</span>
        </div>
      </PageHeader>

      <Container>
        <Reveal>
          <Window title="compliance ~ scrut dashboard" bodyClassName="grid grid-cols-2 gap-px bg-ink-700 md:grid-cols-4">
            {complianceStats.map((s) => (
              <div key={s.label} className="bg-ink-900 p-5">
                <p className="font-mono text-2xl font-semibold text-fg md:text-3xl">{s.value}</p>
                <p className="label mt-2">{s.label}</p>
              </div>
            ))}
          </Window>
        </Reveal>

        <section className="mt-20">
          <SectionHeader index="01" label="roadmap" title="Four phases, from gap analysis to audit" />
          <Roadmap />
        </section>

        <Threads />
        <DeepDives />
        <Status />
      </Container>
    </>
  );
}
