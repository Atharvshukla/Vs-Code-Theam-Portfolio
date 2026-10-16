import { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Lock,
  CheckCircle2,
  Clock,
  ChevronRight,
  ChevronDown,
  FileCheck,
  AlertTriangle,
  Globe,
  Server,
  Cloud,
  Bug,
  Zap,
  BookOpen,
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import {
  complianceThreads,
  complianceStats,
  phases,
  complianceStories,
} from "../data/compliance";

const phaseColors = {
  Discovery: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    text: "text-violet-400",
    dot: "bg-violet-500",
    glow: "shadow-violet-500/20",
    line: "from-violet-500/40",
  },
  Foundation: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    dot: "bg-blue-500",
    glow: "shadow-blue-500/20",
    line: "from-blue-500/40",
  },
  Implementation: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    dot: "bg-amber-500",
    glow: "shadow-amber-500/20",
    line: "from-amber-500/40",
  },
  Validation: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    dot: "bg-emerald-500",
    glow: "shadow-emerald-500/20",
    line: "from-emerald-500/40",
  },
};

const tagIcons = {
  Encryption: Lock,
  GDPR: Globe,
  Monitoring: Server,
  Audit: FileCheck,
  "Incident Response": AlertTriangle,
};

function HeroStats() {
  return (
    <AnimatedSection delay={0.2}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
        {complianceStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            className="glass-light rounded-xl p-5 text-center group hover:border-zinc-600 transition-all duration-500"
          >
            <p className="text-3xl md:text-4xl font-display font-bold gradient-text mb-1">
              {stat.value}
            </p>
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

function PhaseNav() {
  return (
    <AnimatedSection delay={0.3}>
      <div className="flex flex-wrap gap-3 mb-16">
        {phases.map((phase) => {
          const colors = phaseColors[phase.name];
          return (
            <a
              key={phase.name}
              href={`#phase-${phase.name.toLowerCase()}`}
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-lg ${colors.bg} ${colors.border} border transition-all duration-300 cursor-pointer hover:scale-[1.02]`}
            >
              <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
              <span className={`text-sm font-medium ${colors.text}`}>
                {phase.name}
              </span>
              <ChevronRight
                size={14}
                className={`${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`}
              />
            </a>
          );
        })}
      </div>
    </AnimatedSection>
  );
}

function ThreadItem({ thread, index, isLast }) {
  const colors = phaseColors[thread.phase];
  const isActive = thread.status === "in-progress";

  return (
    <AnimatedSection delay={index * 0.06}>
      <div className="relative flex gap-6 md:gap-10">
        {/* Timeline spine */}
        <div className="flex flex-col items-center shrink-0">
          {/* Dot */}
          <div className="relative">
            {isActive && (
              <div
                className={`absolute -inset-2 ${colors.dot} rounded-full opacity-20 animate-ping`}
              />
            )}
            <div
              className={`relative w-4 h-4 rounded-full ${colors.dot} shadow-lg ${colors.glow} z-10 ring-4 ring-[#09090b]`}
            />
          </div>
          {/* Line */}
          {!isLast && (
            <div
              className={`w-px flex-1 min-h-[2rem] bg-gradient-to-b ${colors.line} to-zinc-800/20`}
            />
          )}
        </div>

        {/* Content card */}
        <div className="flex-1 pb-10">
          {/* Header meta */}
          <div className="flex items-center flex-wrap gap-3 mb-3">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-md ${colors.bg} ${colors.text} ${colors.border} border`}
            >
              {thread.phase}
            </span>
            <time className="text-xs text-zinc-500">
              {new Date(thread.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            {isActive && (
              <span className="flex items-center gap-1 text-xs text-amber-400">
                <Clock size={12} />
                In Progress
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display text-xl md:text-2xl font-semibold text-zinc-100 mb-3 leading-tight">
            {thread.title}
          </h3>

          {/* Body */}
          <p className="text-zinc-400 leading-relaxed mb-5">
            {thread.content}
          </p>

          {/* Key decisions */}
          <div className="glass-light rounded-xl p-5 mb-4">
            <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 size={14} className="text-accent" />
              Key Decisions & Actions
            </h4>
            <ul className="space-y-2.5">
              {thread.keyDecisions.map((decision, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                  <span className="text-sm text-zinc-300 leading-relaxed">
                    {decision}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {thread.tags.map((tag) => {
              const TagIcon = tagIcons[tag];
              return (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
                >
                  {TagIcon && <TagIcon size={12} />}
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function ComplianceBadges() {
  return (
    <AnimatedSection delay={0.2}>
      <div className="glass rounded-2xl p-8 md:p-12 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-32 bg-emerald-500/5 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-24 bg-violet-500/5 rounded-full blur-[60px]" />
        </div>

        <div className="relative z-10">
          <h3 className="font-display text-2xl font-semibold text-zinc-100 text-center mb-8">
            Compliance Status
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* SOC2 Badge */}
            <div className="flex items-center gap-4 glass-light rounded-xl px-6 py-5 min-w-[220px]">
              <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
                <Shield size={28} className="text-violet-400" />
              </div>
              <div>
                <p className="font-display font-semibold text-zinc-100">
                  SOC2 Type II
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  <span className="text-xs text-emerald-400 font-medium">
                    Certified (via Scrut)
                  </span>
                </div>
              </div>
            </div>

            {/* GDPR Badge */}
            <div className="flex items-center gap-4 glass-light rounded-xl px-6 py-5 min-w-[220px]">
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <Globe size={28} className="text-emerald-400" />
              </div>
              <div>
                <p className="font-display font-semibold text-zinc-100">
                  GDPR
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <CheckCircle2 size={12} className="text-emerald-400" />
                  <span className="text-xs text-emerald-400 font-medium">
                    Compliant (via Scrut)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

const severityStyles = {
  critical: {
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    text: "text-red-400",
    label: "Critical",
  },
  high: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    text: "text-orange-400",
    label: "High",
  },
  medium: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
    text: "text-yellow-400",
    label: "Medium",
  },
};

const storyIcons = {
  shield: Shield,
  cloud: Cloud,
};

const storyColors = {
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-400",
    dot: "bg-blue-500",
    glow: "from-blue-600/8",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    dot: "bg-amber-500",
    glow: "from-amber-600/8",
  },
};

function StoryChapter({ chapter, index, isLast, color }) {
  const [open, setOpen] = useState(false);
  const colors = storyColors[color];

  return (
    <div className="relative flex gap-5">
      {/* Mini timeline */}
      <div className="flex flex-col items-center shrink-0 pt-1">
        <div className={`w-2.5 h-2.5 rounded-full ${colors.dot} ring-4 ring-[#09090b] z-10`} />
        {!isLast && <div className={`w-px flex-1 bg-gradient-to-b ${colors.glow} to-zinc-800/10`} />}
      </div>

      <div className="flex-1 pb-6">
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left cursor-pointer group"
        >
          <div className="flex items-center justify-between gap-3">
            <h4 className="font-display text-base font-semibold text-zinc-200 group-hover:text-accent transition-colors">
              {chapter.title}
            </h4>
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} className="text-zinc-500 shrink-0" />
            </motion.div>
          </div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-sm text-zinc-400 leading-relaxed mt-3 mb-4">
                {chapter.content}
              </p>
              <ul className="space-y-2">
                {chapter.actions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-zinc-300">{action}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SubStoryThread({ thread, index }) {
  const [open, setOpen] = useState(false);
  const severity = severityStyles[thread.severity];

  return (
    <div className="glass-light rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-4 cursor-pointer group flex items-start gap-4"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Bug size={16} className="text-zinc-500 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center flex-wrap gap-2 mb-1">
              <h5 className="text-sm font-semibold text-zinc-200 group-hover:text-accent transition-colors">
                {thread.title}
              </h5>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${severity.bg} ${severity.text} ${severity.border} border`}
              >
                {severity.label}
              </span>
            </div>
            <p className="text-xs text-zinc-500">{thread.date}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className="text-zinc-500 shrink-0" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0">
              <p className="text-sm text-zinc-400 leading-relaxed mb-4 ml-7">
                {thread.content}
              </p>
              <div className="ml-7 glass rounded-lg p-4">
                <h6 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Zap size={12} className="text-accent" />
                  Fixes Applied
                </h6>
                <ul className="space-y-2">
                  {thread.fixes.map((fix, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 shrink-0" />
                      <span className="text-xs text-zinc-300 leading-relaxed">{fix}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DeepDiveStories() {
  const [expandedStory, setExpandedStory] = useState(null);

  return (
    <section className="mt-24 mb-8">
      <AnimatedSection>
        <div className="flex items-center gap-3 mb-2">
          <BookOpen size={20} className="text-accent" />
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-zinc-100">
            Deep Dive Stories
          </h2>
        </div>
        <p className="text-zinc-400 mb-10 max-w-2xl">
          Detailed engineering chronicles of the biggest compliance challenges
          we faced — each bug, each gap, and how we fixed them.
        </p>
      </AnimatedSection>

      <div className="space-y-6">
        {complianceStories.map((story, i) => {
          const isExpanded = expandedStory === story.id;
          const colors = storyColors[story.color];
          const IconComp = storyIcons[story.icon];

          return (
            <AnimatedSection key={story.id} delay={i * 0.1}>
              <div
                className={`glass rounded-2xl overflow-hidden transition-all duration-500 ${
                  isExpanded ? "ring-1 ring-zinc-700" : ""
                }`}
              >
                {/* Story header — clickable */}
                <button
                  onClick={() =>
                    setExpandedStory(isExpanded ? null : story.id)
                  }
                  className="w-full text-left p-6 md:p-8 cursor-pointer group"
                >
                  <div className="flex items-start gap-5">
                    <div
                      className={`p-3 rounded-xl ${colors.bg} ${colors.border} border shrink-0`}
                    >
                      <IconComp size={24} className={colors.text} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-3 mb-2">
                        <span className={`text-xs font-semibold ${colors.text}`}>
                          {story.date}
                        </span>
                        {story.subStories && (
                          <span className="text-xs text-zinc-500">
                            {story.subStories.length} stories &middot;{" "}
                            {story.subStories.reduce(
                              (acc, s) => acc + s.threads.length,
                              0
                            )}{" "}
                            threads
                          </span>
                        )}
                        {story.chapters && story.chapters.length > 0 && (
                          <span className="text-xs text-zinc-500">
                            {story.chapters.length} chapters
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-xl md:text-2xl font-semibold text-zinc-100 group-hover:text-accent transition-colors mb-2">
                        {story.title}
                      </h3>
                      <p className="text-sm text-zinc-400">{story.subtitle}</p>
                    </div>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2"
                    >
                      <ChevronDown size={20} className="text-zinc-500" />
                    </motion.div>
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8 border-t border-zinc-800/50">
                        {/* Overview */}
                        <p className="text-zinc-400 leading-relaxed my-6">
                          {story.overview}
                        </p>

                        {/* Chapters (for DPDR) */}
                        {story.chapters && story.chapters.length > 0 && (
                          <div className="ml-2">
                            {story.chapters.map((chapter, ci) => (
                              <StoryChapter
                                key={ci}
                                chapter={chapter}
                                index={ci}
                                isLast={ci === story.chapters.length - 1}
                                color={story.color}
                              />
                            ))}
                          </div>
                        )}

                        {/* Sub-stories (for AWS) */}
                        {story.subStories &&
                          story.subStories.map((subStory) => (
                            <div key={subStory.id} className="mt-8">
                              <div className="flex items-center gap-3 mb-3">
                                <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                                <h4 className="font-display text-lg font-semibold text-zinc-100">
                                  {subStory.title}
                                </h4>
                              </div>
                              <p className="text-sm text-zinc-400 mb-5 ml-5">
                                {subStory.overview}
                              </p>

                              <div className="space-y-2 ml-5">
                                {subStory.threads.map((thread, ti) => (
                                  <SubStoryThread
                                    key={ti}
                                    thread={thread}
                                    index={ti}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}

export default function Compliance() {
  // Group threads by phase
  const groupedByPhase = {};
  complianceThreads.forEach((thread) => {
    if (!groupedByPhase[thread.phase]) {
      groupedByPhase[thread.phase] = [];
    }
    groupedByPhase[thread.phase].push(thread);
  });

  return (
    <>
      <Head>
        <title>SOC2 & GDPR Compliance — Atharv Shukla</title>
        <meta
          name="description"
          content="How I made Mentorgain SOC2 Type II and GDPR compliant — the full engineering chronicle."
        />
      </Head>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero */}
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                <Shield size={20} className="text-accent" />
              </div>
              <p className="text-sm text-accent font-medium tracking-wider uppercase">
                Compliance Chronicle
              </p>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-100 mb-5 leading-tight">
              A Practical Guide to{" "}
              <span className="gradient-text italic">SOC2 & GDPR</span>{" "}
              Compliance
            </h1>

            <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed mb-6">
              A step-by-step engineering guide to making a B2B SaaS platform
              SOC2 Type II and GDPR compliant using Scrut Automation — from
              first audit to certification in ~90 days.
            </p>

            <div className="flex items-center gap-4 text-sm text-zinc-500 mb-12">
              <span className="flex items-center gap-1.5">
                <FileCheck size={14} />8 threads
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                90-day journey
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="flex items-center gap-1.5">
                <Lock size={14} />
                Ongoing
              </span>
            </div>
          </AnimatedSection>

          {/* Stats */}
          <HeroStats />

          {/* Phase navigation */}
          <PhaseNav />

          {/* Thread timeline */}
          {phases.map((phase) => {
            const phaseThreads = groupedByPhase[phase.name] || [];
            if (phaseThreads.length === 0) return null;

            return (
              <div key={phase.name} id={`phase-${phase.name.toLowerCase()}`} className="mb-8">
                <AnimatedSection>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-3 h-3 rounded-full ${phaseColors[phase.name].dot}`}
                    />
                    <h2 className="font-display text-lg font-semibold text-zinc-300">
                      {phase.name}
                    </h2>
                  </div>
                  <p className="text-sm text-zinc-500 mb-8 ml-6">
                    {phase.description}
                  </p>
                </AnimatedSection>

                {phaseThreads.map((thread, i) => (
                  <ThreadItem
                    key={thread.id}
                    thread={thread}
                    index={i}
                    isLast={
                      i === phaseThreads.length - 1 &&
                      phase.name === phases[phases.length - 1].name
                    }
                  />
                ))}
              </div>
            );
          })}

          {/* Compliance badges */}
          <DeepDiveStories />
          <ComplianceBadges />
        </div>
      </section>
    </>
  );
}
