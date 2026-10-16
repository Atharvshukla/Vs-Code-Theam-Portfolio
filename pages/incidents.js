import { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronDown,
  Activity,
  Server,
  Zap,
  ShieldCheck,
  CircleDot,
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import { incidents, incidentStats } from "../data/incidents";

const severityConfig = {
  P0: {
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    text: "text-red-400",
    glow: "shadow-red-500/20",
    pulse: "bg-red-500",
    label: "SEV-0 / Critical",
  },
  P1: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    text: "text-orange-400",
    glow: "shadow-orange-500/20",
    pulse: "bg-orange-500",
    label: "SEV-1 / High",
  },
  P2: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    text: "text-yellow-400",
    glow: "shadow-yellow-500/20",
    pulse: "bg-yellow-500",
    label: "SEV-2 / Medium",
  },
};

const timelineTypeConfig = {
  alert: { icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500" },
  investigate: { icon: Activity, color: "text-blue-400", bg: "bg-blue-500" },
  "root-cause": { icon: Terminal, color: "text-amber-400", bg: "bg-amber-500" },
  fix: { icon: Zap, color: "text-emerald-400", bg: "bg-emerald-500" },
  resolved: { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-500" },
  followup: { icon: ShieldCheck, color: "text-violet-400", bg: "bg-violet-500" },
  info: { icon: CircleDot, color: "text-zinc-400", bg: "bg-zinc-500" },
};

function StatusPulse() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
    </span>
  );
}

function IncidentCard({ incident, index }) {
  const [expanded, setExpanded] = useState(false);
  const sev = severityConfig[incident.severity];

  return (
    <AnimatedSection delay={index * 0.08}>
      <div
        className={`rounded-xl overflow-hidden border transition-all duration-500 ${
          expanded
            ? "border-zinc-700 bg-[#0c0c0e]"
            : "border-zinc-800/50 bg-[#0c0c0e]/50 hover:border-zinc-700"
        }`}
      >
        {/* Header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left p-5 md:p-6 cursor-pointer group"
        >
          <div className="flex items-start gap-4">
            {/* Severity indicator */}
            <div className={`mt-1 p-2.5 rounded-lg ${sev.bg} ${sev.border} border shrink-0`}>
              <AlertTriangle size={18} className={sev.text} />
            </div>

            <div className="flex-1 min-w-0">
              {/* Top meta row */}
              <div className="flex items-center flex-wrap gap-2.5 mb-2">
                <code className="text-xs font-mono text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded">
                  {incident.id}
                </code>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${sev.bg} ${sev.text} ${sev.border} border font-mono`}>
                  {incident.severity}
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  {incident.date}
                </span>
                <span className="text-xs text-zinc-600 font-mono flex items-center gap-1">
                  <Clock size={11} />
                  {incident.duration}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-mono text-base md:text-lg font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors mb-2 leading-snug">
                {incident.title}
              </h3>

              {/* Service + tags */}
              <div className="flex items-center flex-wrap gap-2">
                <code className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {incident.service}
                </code>
                {incident.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800/60 text-zinc-500 border border-zinc-700/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="mt-1"
            >
              <ChevronDown size={18} className="text-zinc-500" />
            </motion.div>
          </div>
        </button>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-6 pb-6 space-y-6">
                {/* Divider */}
                <div className="border-t border-zinc-800/80 border-dashed" />

                {/* Impact banner */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                  <AlertTriangle size={16} className="text-red-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-mono font-semibold text-red-400 uppercase tracking-wider mb-1">
                      Impact
                    </p>
                    <p className="text-sm font-mono text-zinc-300">
                      {incident.impact}
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <p className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                    &gt; Summary
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed font-mono">
                    {incident.summary}
                  </p>
                </div>

                {/* Timeline */}
                <div>
                  <p className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                    &gt; Incident Timeline
                  </p>
                  <div className="relative ml-1">
                    {incident.timeline.map((entry, i) => {
                      const config = timelineTypeConfig[entry.type];
                      const Icon = config.icon;
                      const isLast = i === incident.timeline.length - 1;

                      return (
                        <div key={i} className="flex gap-3 relative">
                          {/* Spine */}
                          <div className="flex flex-col items-center">
                            <div className={`w-2 h-2 rounded-full ${config.bg} ring-2 ring-[#0c0c0e] z-10 mt-1.5`} />
                            {!isLast && <div className="w-px flex-1 bg-zinc-800" />}
                          </div>

                          <div className={`flex-1 ${isLast ? "pb-0" : "pb-4"}`}>
                            <div className="flex items-center gap-2.5 mb-0.5">
                              <code className="text-[11px] font-mono text-zinc-500 bg-zinc-800/60 px-1.5 py-0.5 rounded">
                                {entry.time}
                              </code>
                              <Icon size={13} className={config.color} />
                            </div>
                            <p className="text-sm font-mono text-zinc-300">
                              {entry.event}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Root cause */}
                <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/10">
                  <p className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Terminal size={13} />
                    Root Cause
                  </p>
                  <p className="text-sm font-mono text-zinc-300 leading-relaxed">
                    {incident.rootCause}
                  </p>
                </div>

                {/* Fix */}
                <div>
                  <p className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Zap size={13} />
                    Fix Applied
                  </p>
                  <ul className="space-y-2">
                    {incident.fix.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-sm font-mono text-zinc-300">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prevention */}
                <div className="p-4 rounded-lg bg-violet-500/5 border border-violet-500/10">
                  <p className="text-xs font-mono font-semibold text-violet-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <ShieldCheck size={13} />
                    Prevention Measures
                  </p>
                  <ul className="space-y-2">
                    {incident.prevention.map((p, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                        <span className="text-sm font-mono text-zinc-400">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}

export default function Incidents() {
  return (
    <>
      <Head>
        <title>Production Incidents — Atharv Shukla</title>
        <meta
          name="description"
          content="Real production bugs, real fixes. How I debug and resolve production incidents at Mentorgain."
        />
      </Head>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero */}
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Terminal size={20} className="text-emerald-400" />
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm text-emerald-400 font-mono font-semibold tracking-wider uppercase">
                  Production Debugging Patterns
                </p>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <StatusPulse />
                  <span className="text-[11px] font-mono text-emerald-400 font-medium">
                    ALL SYSTEMS OPERATIONAL
                  </span>
                </div>
              </div>
            </div>

            <h1 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-100 mb-5 leading-tight">
              Production{" "}
              <span className="text-emerald-400">Debugging</span>{" "}
              <span className="text-zinc-500">&</span>{" "}
              <span className="text-red-400">Case Studies</span>
            </h1>

            <p className="text-base text-zinc-400 max-w-2xl leading-relaxed mb-6 font-mono">
              Common production patterns, how they break, and how to fix them.
              Real-world debugging case studies for backend engineers — root
              causes, timelines, and prevention strategies.
            </p>

            {/* Terminal-style status bar */}
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 mb-12">
              <span className="flex items-center gap-1.5">
                <Server size={12} />
                production-patterns
              </span>
              <span className="text-zinc-700">|</span>
              <span>{incidents.length} case studies</span>
              <span className="text-zinc-700">|</span>
              <span className="text-emerald-500">all resolved</span>
            </div>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
              {incidentStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                  className="p-4 rounded-lg border border-zinc-800/50 bg-[#0c0c0e] text-center"
                >
                  <p className="text-2xl font-mono font-bold text-zinc-100">
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Incident list */}
          <div className="space-y-4">
            {incidents.map((incident, i) => (
              <IncidentCard key={incident.id} incident={incident} index={i} />
            ))}
          </div>

          {/* Bottom status */}
          <AnimatedSection delay={0.3}>
            <div className="mt-16 p-5 rounded-xl border border-zinc-800/50 bg-[#0c0c0e]/50 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <StatusPulse />
                <p className="font-mono text-sm font-semibold text-emerald-400">
                  All patterns documented
                </p>
              </div>
              <p className="text-xs font-mono text-zinc-500">
                Each case study includes root cause, fix, and prevention
                strategy
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
