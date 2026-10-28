import { useState } from "react";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Clock, Server, ShieldCheck, Wrench } from "lucide-react";
import { Container, PageHeader, Reveal, Stagger, StaggerItem, Tag, StatusDot, Window, ease } from "../components/ui";
import { incidents, incidentStats } from "../data/incidents";

const severityStyles = {
  P0: "border-red-500/40 bg-red-500/10 text-red-400",
  P1: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  P2: "border-ink-500 bg-ink-800 text-fg-muted",
};

// Timeline events are colour-coded by what kind of step they were.
const eventStyles = {
  alert: { dot: "bg-red-400", text: "text-red-400", label: "alert" },
  investigate: { dot: "bg-amber-400", text: "text-amber-400", label: "investigate" },
  "root-cause": { dot: "bg-orange-400", text: "text-orange-400", label: "root cause" },
  fix: { dot: "bg-sky-400", text: "text-sky-400", label: "fix" },
  resolved: { dot: "bg-accent", text: "text-accent", label: "resolved" },
  followup: { dot: "bg-fg-dim", text: "text-fg-dim", label: "follow-up" },
  info: { dot: "bg-fg-faint", text: "text-fg-dim", label: "info" },
};

function SeverityBadge({ severity }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] font-semibold ${
        severityStyles[severity] || severityStyles.P2
      }`}
    >
      {severity}
    </span>
  );
}

function Checklist({ items, icon: Icon, iconClass }) {
  return (
    <ul className="space-y-2.5">
      {items.map((text) => (
        <li key={text} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
          <Icon size={15} className={`mt-[3px] shrink-0 ${iconClass}`} />
          <span>{text}</span>
        </li>
      ))}
    </ul>
  );
}

function Timeline({ events }) {
  return (
    <ol className="relative space-y-4 border-l border-ink-600 pl-6">
      {events.map((e, i) => {
        const style = eventStyles[e.type] || eventStyles.info;
        return (
          <motion.li
            key={`${e.time}-${i}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.3, ease }}
            className="relative"
          >
            <span
              className={`absolute -left-[29px] top-[7px] h-2 w-2 rounded-full ring-4 ring-ink-900 ${style.dot}`}
            />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-xs text-fg">{e.time}</span>
              <span className={`font-mono text-[10px] uppercase tracking-wider ${style.text}`}>
                {style.label}
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-fg-muted">{e.event}</p>
          </motion.li>
        );
      })}
    </ol>
  );
}

function IncidentCard({ incident, open, onToggle }) {
  return (
    <motion.article layout="position" className="panel overflow-hidden">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full flex-col gap-4 p-5 text-left transition-colors hover:bg-ink-850 sm:p-6"
      >
        <div className="flex w-full flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-fg-dim">{incident.id}</span>
          <SeverityBadge severity={incident.severity} />
          <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent">
            <CheckCircle2 size={11} /> {incident.status}
          </span>
          <span className="ml-auto font-mono text-xs text-fg-dim">{incident.date}</span>
        </div>
        <div className="flex w-full items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold tracking-tight text-fg sm:text-xl">{incident.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              <span className="text-fg-dim">impact: </span>
              {incident.impact}
            </p>
          </div>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-md border border-ink-600 text-fg-dim"
          >
            <ChevronDown size={15} />
          </motion.span>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-fg-dim">
          <span className="flex items-center gap-1.5">
            <Server size={12} /> {incident.service}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} /> {incident.duration}
          </span>
          <span className="flex flex-wrap gap-1.5">
            {incident.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="overflow-hidden"
          >
            <div className="space-y-8 border-t border-ink-700 p-5 sm:p-6">
              <section>
                <p className="label mb-3">summary</p>
                <p className="text-sm leading-relaxed text-fg-muted">{incident.summary}</p>
              </section>

              <div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
                <section>
                  <p className="label mb-4">timeline</p>
                  <Timeline events={incident.timeline} />
                </section>
                <section>
                  <p className="label mb-3">root cause</p>
                  <div className="rounded-lg border border-orange-500/25 bg-orange-500/[0.06] p-4 text-sm leading-relaxed text-fg-muted">
                    {incident.rootCause}
                  </div>
                </section>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <section>
                  <p className="label mb-3">fix</p>
                  <Checklist items={incident.fix} icon={Wrench} iconClass="text-sky-400" />
                </section>
                <section>
                  <p className="label mb-3">prevention</p>
                  <Checklist items={incident.prevention} icon={ShieldCheck} iconClass="text-accent" />
                </section>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function Incidents() {
  const [openId, setOpenId] = useState(incidents[0]?.id);

  return (
    <>
      <Head>
        <title>Postmortems — Atharv Shukla</title>
        <meta
          name="description"
          content="Production debugging case studies for backend engineers: timelines, root causes, fixes and prevention."
        />
      </Head>

      <PageHeader
        path="postmortems"
        title="Production postmortems"
        description="Common production patterns, how they break, and how to fix them. Real-world debugging case studies for backend engineers — root causes, timelines, and prevention strategies."
      >
        <div className="mt-8">
          <StatusDot label="all systems operational · all patterns documented" />
        </div>
      </PageHeader>

      <Container>
        <Reveal>
          <Window title="on-call ~ production-patterns" bodyClassName="grid grid-cols-2 gap-px bg-ink-700 md:grid-cols-4">
            {incidentStats.map((s) => (
              <div key={s.label} className="bg-ink-900 p-5">
                <p className="font-mono text-2xl font-semibold text-fg md:text-3xl">{s.value}</p>
                <p className="label mt-2">{s.label}</p>
              </div>
            ))}
          </Window>
        </Reveal>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-fg-dim">
          {Object.entries(eventStyles)
            .filter(([k]) => k !== "info")
            .map(([k, s]) => (
              <span key={k} className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} /> {s.label}
              </span>
            ))}
        </div>

        <Stagger className="mt-8 space-y-4">
          {incidents.map((incident) => (
            <StaggerItem key={incident.id}>
              <IncidentCard
                incident={incident}
                open={openId === incident.id}
                onToggle={() => setOpenId(openId === incident.id ? null : incident.id)}
              />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <p className="mt-10 font-mono text-xs text-fg-dim">
            <span className="text-accent">✓</span> Each case study includes root cause, fix, and prevention strategy.
          </p>
        </Reveal>
      </Container>
    </>
  );
}
