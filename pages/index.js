import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Shield,
  Lock,
  Globe,
  Terminal,
  AlertTriangle,
  Cable,
  Plug,
  Zap,
  CheckCircle2,
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import projects from "../data/projects";
import blogPosts from "../data/blog";
import { complianceStats } from "../data/compliance";
import { incidents, incidentStats } from "../data/incidents";
import integrations from "../data/integrations";

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[160px] animate-glow" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-fuchsia-600/6 rounded-full blur-[128px] animate-glow" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative w-full max-w-sm lg:max-w-md shrink-0"
          >
            {/* Glow behind photo */}
            <div className="absolute -inset-8 bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-transparent rounded-full blur-[80px] animate-glow" />

            {/* Photo container */}
            <div className="relative">
              {/* Decorative border ring */}
              <div className="absolute -inset-3 rounded-2xl border border-violet-500/10 rotate-2" />
              <div className="absolute -inset-3 rounded-2xl border border-fuchsia-500/10 -rotate-1" />

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden">
                {/* Edge fades to blend white bg into dark theme */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#09090b] via-transparent to-[#09090b]/60" />
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#09090b]/50 via-transparent to-[#09090b]/50" />

                <img
                  src="/atharv.jpg"
                  alt="Atharv Shukla"
                  className="w-full h-auto relative z-0 brightness-75 contrast-125"
                />

                {/* Key light — warm top-left */}
                <div className="absolute -top-16 -left-16 z-[9] w-96 h-96 bg-amber-300/12 rounded-full blur-[120px]" />
                {/* Warm fill — center face area */}
                <div className="absolute top-[15%] left-[20%] z-[9] w-72 h-64 bg-orange-200/10 rounded-full blur-[80px]" />
                {/* Rim light — warm right edge */}
                <div className="absolute top-[10%] -right-8 z-[9] w-48 h-[70%] bg-amber-400/12 rounded-full blur-[70px] rotate-6" />
                {/* Hair light — warm top glow */}
                <div className="absolute -top-10 left-1/3 z-[9] w-64 h-40 bg-orange-300/8 rounded-full blur-[60px]" />
                {/* Accent kicker — violet from bottom-right for depth */}
                <div className="absolute bottom-[20%] right-[10%] z-[9] w-56 h-56 bg-violet-400/8 rounded-full blur-[80px]" />

                {/* Warm color wash over image */}
                <div className="absolute inset-0 z-[8] bg-gradient-to-br from-amber-900/15 via-orange-900/5 to-violet-900/10 mix-blend-color" />
              </div>
            </div>
          </motion.div>

          {/* Right — Text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-zinc-800 bg-zinc-900/50 text-sm text-zinc-400"
            >
              <Sparkles size={14} className="text-accent" />
              <span>Founding Engineer at Mentorgain</span>
            </motion.div>

            {/* Main heading */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] mb-6">
              <span className="text-zinc-100">Building </span>
              <span className="gradient-text italic">products</span>
              <br />
              <span className="text-zinc-100">that </span>
              <span className="gradient-text-warm italic">matter</span>
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-lg text-lg text-zinc-400 leading-relaxed mb-8 mx-auto lg:mx-0"
            >
              I&apos;m Atharv Shukla — a founding engineer crafting the future
              of mentorship at Mentorgain. I write about building from zero to
              one, and everything I learn along the way.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4"
            >
              <Link
                href="/projects"
                className="group flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-zinc-950 font-medium rounded-lg transition-all duration-300 cursor-pointer"
              >
                View Projects
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/blog"
                className="group flex items-center gap-2 px-6 py-3 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-zinc-100 font-medium rounded-lg transition-all duration-300 cursor-pointer"
              >
                Read the Blog
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex items-center gap-8 mt-10 pt-8 border-t border-zinc-800/50 justify-center lg:justify-start"
            >
              <div>
                <p className="text-2xl font-display font-semibold text-zinc-100">0→1</p>
                <p className="text-xs text-zinc-500 mt-1">Building Phase</p>
              </div>
              <div className="w-px h-8 bg-zinc-800" />
              <div>
                <p className="text-2xl font-display font-semibold text-zinc-100">5+</p>
                <p className="text-xs text-zinc-500 mt-1">Projects Shipped</p>
              </div>
              <div className="w-px h-8 bg-zinc-800" />
              <div>
                <p className="text-2xl font-display font-semibold text-zinc-100">∞</p>
                <p className="text-xs text-zinc-500 mt-1">Cups of Chai</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-zinc-700 flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-zinc-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm text-accent font-medium tracking-wider uppercase mb-2">
                Selected Work
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-zinc-100">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden sm:flex items-center gap-1 text-sm text-zinc-400 hover:text-accent transition-colors cursor-pointer"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <AnimatedSection key={project.title} delay={i * 0.1}>
              <div className="group relative glass-light rounded-xl overflow-hidden hover:border-zinc-600 transition-all duration-500 cursor-pointer h-full flex flex-col">
                {/* Image placeholder */}
                <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-display font-semibold text-zinc-700 group-hover:text-zinc-600 transition-colors">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-lg font-semibold text-zinc-100 mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="mt-8 sm:hidden text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-accent transition-colors cursor-pointer"
            >
              View all projects
              <ArrowRight size={14} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function IntegrationsPreview() {
  const latest = integrations[0];
  if (!latest) return null;

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <Link href="/integrations" className="block cursor-pointer group">
            <div className="rounded-2xl p-8 md:p-12 relative overflow-hidden border border-zinc-800/50 bg-[#0c0c0e] hover:border-accent/30 transition-all duration-500">
              {/* Connection nodes background */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-8 right-12 w-48 h-48 opacity-20 hidden md:block">
                  <svg viewBox="0 0 200 200" fill="none">
                    <circle cx="30" cy="30" r="4" fill="#a78bfa" opacity="0.6">
                      <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="100" cy="50" r="3" fill="#c084fc" opacity="0.4">
                      <animate attributeName="opacity" values="0.2;0.7;0.2" dur="4s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="170" cy="30" r="4" fill="#a78bfa" opacity="0.5">
                      <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="60" cy="120" r="3" fill="#c084fc" opacity="0.3">
                      <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.5s" repeatCount="indefinite" />
                    </circle>
                    <line x1="32" y1="32" x2="98" y2="48" stroke="#a78bfa" strokeWidth="0.8" opacity="0.15" />
                    <line x1="102" y1="52" x2="168" y2="32" stroke="#a78bfa" strokeWidth="0.8" opacity="0.15" />
                    <line x1="100" y1="52" x2="62" y2="118" stroke="#c084fc" strokeWidth="0.8" opacity="0.1" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 w-64 h-32 bg-accent/3 rounded-full blur-[80px]" />
              </div>

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 relative">
                        <Cable size={18} className="text-accent" />
                      </div>
                      <p className="text-sm text-accent font-medium tracking-wider uppercase">
                        Integration Stories
                      </p>
                    </div>

                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-zinc-100 mb-3 group-hover:text-accent transition-colors">
                      Enterprise Integrations
                    </h2>
                    <p className="text-zinc-400 leading-relaxed max-w-xl mb-5">
                      Practical guides to building enterprise integrations for
                      B2B SaaS — authentication, multi-tenancy, and the
                      hard-won lessons.
                    </p>

                    {/* Latest integration card */}
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/50 flex items-center justify-center shrink-0">
                        <Plug size={18} className="text-zinc-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-accent">
                            {latest.platform}
                          </span>
                          <CheckCircle2
                            size={12}
                            className="text-emerald-400"
                          />
                        </div>
                        <p className="text-sm text-zinc-300 font-medium truncate">
                          {latest.title}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {latest.readTime}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visual connector */}
                  <div className="hidden lg:flex flex-col items-center justify-center gap-3 shrink-0 py-4">
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                      <span className="text-[10px] font-mono font-bold text-zinc-400">
                        SaaS
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-px h-4 bg-gradient-to-b from-zinc-700 to-accent/50" />
                      <Zap size={14} className="text-accent" />
                      <div className="w-px h-4 bg-gradient-to-b from-accent/50 to-zinc-700" />
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                      <Plug size={18} className="text-zinc-400" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-6 text-sm text-zinc-500 group-hover:text-accent transition-colors">
                  Explore integrations
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

function CompliancePreview() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <Link href="/compliance" className="block cursor-pointer group">
            <div className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden hover:border-zinc-600 transition-all duration-500">
              {/* Background accents */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/5 rounded-full blur-[80px]" />
              </div>

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  {/* Left content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                        <Shield size={18} className="text-accent" />
                      </div>
                      <p className="text-sm text-accent font-medium tracking-wider uppercase">
                        Compliance Chronicle
                      </p>
                    </div>

                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-zinc-100 mb-3 group-hover:text-accent transition-colors">
                      SOC2 & GDPR Compliance Guide
                    </h2>
                    <p className="text-zinc-400 leading-relaxed max-w-xl mb-6">
                      A practical engineering guide to SOC2 Type II and GDPR
                      compliance for B2B SaaS — from first audit to
                      certification. Every decision documented.
                    </p>

                    {/* Mini badges */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Lock size={14} className="text-violet-400" />
                        <span className="text-zinc-300">SOC2 Type II</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-zinc-700" />
                      <div className="flex items-center gap-2 text-sm">
                        <Globe size={14} className="text-emerald-400" />
                        <span className="text-zinc-300">GDPR</span>
                      </div>
                    </div>
                  </div>

                  {/* Right stats */}
                  <div className="grid grid-cols-2 gap-3 lg:w-64 shrink-0">
                    {complianceStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="glass-light rounded-lg p-3 text-center"
                      >
                        <p className="text-xl font-display font-bold text-zinc-100">
                          {stat.value}
                        </p>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Read more arrow */}
                <div className="flex items-center gap-1 mt-6 text-sm text-zinc-500 group-hover:text-accent transition-colors">
                  Read the full chronicle
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

function IncidentsPreview() {
  const latest = incidents.slice(0, 3);

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <Link href="/incidents" className="block cursor-pointer group">
            <div className="rounded-2xl p-8 md:p-12 relative overflow-hidden border border-zinc-800/50 bg-[#0c0c0e] hover:border-zinc-700 transition-all duration-500">
              {/* Scanline effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                }}
              />
              {/* Glow accents */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-600/5 rounded-full blur-[80px]" />
              </div>

              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                  {/* Left content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <Terminal size={18} className="text-emerald-400" />
                      </div>
                      <p className="text-sm text-emerald-400 font-mono font-semibold tracking-wider uppercase">
                        Debugging Patterns
                      </p>
                    </div>

                    <h2 className="font-mono text-2xl md:text-3xl font-bold text-zinc-100 mb-3 group-hover:text-emerald-400 transition-colors">
                      Production Debugging Case Studies
                    </h2>
                    <p className="text-zinc-400 leading-relaxed max-w-xl mb-6 font-mono text-sm">
                      Common production patterns, how they break, and how to
                      fix them. Real-world debugging for backend engineers.
                    </p>

                    {/* Latest incident previews */}
                    <div className="space-y-2">
                      {latest.map((inc) => (
                        <div
                          key={inc.id}
                          className="flex items-center gap-3 text-sm font-mono"
                        >
                          <code className="text-[11px] text-zinc-600 bg-zinc-800/60 px-1.5 py-0.5 rounded">
                            {inc.id}
                          </code>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              inc.severity === "P0"
                                ? "bg-red-500/10 text-red-400"
                                : "bg-orange-500/10 text-orange-400"
                            }`}
                          >
                            {inc.severity}
                          </span>
                          <span className="text-zinc-400 truncate">
                            {inc.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right stats */}
                  <div className="grid grid-cols-2 gap-3 lg:w-56 shrink-0">
                    {incidentStats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-lg p-3 text-center border border-zinc-800/50 bg-zinc-900/30"
                      >
                        <p className="text-lg font-mono font-bold text-zinc-100">
                          {stat.value}
                        </p>
                        <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1 mt-6 text-sm font-mono text-zinc-500 group-hover:text-emerald-400 transition-colors">
                  View all case studies
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}

function LatestPosts() {
  const latest = blogPosts.slice(0, 3);

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm text-accent font-medium tracking-wider uppercase mb-2">
                From the Blog
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-zinc-100">
                Founding Engineer Chronicles
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-1 text-sm text-zinc-400 hover:text-accent transition-colors cursor-pointer"
            >
              All posts
              <ArrowRight size={14} />
            </Link>
          </div>
        </AnimatedSection>

        <div className="space-y-4">
          {latest.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="block cursor-pointer">
                <article className="group glass-light rounded-xl p-6 hover:border-zinc-600 transition-all duration-500">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <time className="text-xs text-zinc-500 font-medium">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                        <span className="text-xs text-zinc-600">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-semibold text-zinc-100 group-hover:text-accent transition-colors mb-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-zinc-400 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="text-zinc-600 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                    />
                  </div>
                </article>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="mt-8 sm:hidden text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-accent transition-colors cursor-pointer"
            >
              All posts
              <ArrowRight size={14} />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="relative glass rounded-2xl p-12 md:p-16 text-center overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-violet-600/10 rounded-full blur-[80px]" />
            </div>

            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-zinc-100 mb-4">
                Let&apos;s build something together
              </h2>
              <p className="text-zinc-400 max-w-lg mx-auto mb-8 leading-relaxed">
                Whether you have an idea, want to collaborate, or just want to
                say hello — I&apos;d love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:atharvshukla.dev@gmail.com"
                  className="group flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-zinc-950 font-medium rounded-lg transition-all duration-300 cursor-pointer"
                >
                  Get in Touch
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
                <Link
                  href="/contact"
                  className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  Or find me on socials
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Atharv Shukla — Founding Engineer</title>
      </Head>
      <HeroSection />
      <FeaturedProjects />
      <IntegrationsPreview />
      <CompliancePreview />
      <IncidentsPreview />
      <LatestPosts />
      <ContactCTA />
    </>
  );
}
