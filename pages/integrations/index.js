import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plug,
  ArrowRight,
  ArrowUpRight,
  Zap,
  CheckCircle2,
  Cable,
} from "lucide-react";
import AnimatedSection from "../../components/AnimatedSection";
import integrations from "../../data/integrations";

function ConnectorLine({ delay = 0 }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: "easeInOut" }}
      className="hidden lg:block absolute top-1/2 -translate-y-1/2 h-px w-16 origin-left"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(167,139,250,0.4), transparent)",
      }}
    />
  );
}

function FlowDot({ delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className={`w-2 h-2 rounded-full bg-accent ${className}`}
    />
  );
}

export default function Integrations() {
  return (
    <>
      <Head>
        <title>Integrations — Atharv Shukla</title>
        <meta
          name="description"
          content="Practical guides to building enterprise integrations — Microsoft Teams, Mixpanel, SSO, and more."
        />
      </Head>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero with connector visual */}
          <AnimatedSection>
            <div className="relative mb-16">
              {/* Animated connection dots background */}
              <div className="absolute -top-8 -right-8 pointer-events-none opacity-30 hidden md:block">
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 200 200"
                  fill="none"
                >
                  <circle cx="20" cy="20" r="3" fill="#a78bfa" opacity="0.6">
                    <animate
                      attributeName="opacity"
                      values="0.3;0.8;0.3"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="80" cy="40" r="2" fill="#a78bfa" opacity="0.4">
                    <animate
                      attributeName="opacity"
                      values="0.2;0.7;0.2"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="140" cy="20" r="3" fill="#c084fc" opacity="0.5">
                    <animate
                      attributeName="opacity"
                      values="0.3;0.9;0.3"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="60" cy="100" r="2" fill="#a78bfa" opacity="0.3">
                    <animate
                      attributeName="opacity"
                      values="0.2;0.6;0.2"
                      dur="3.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="160" cy="80" r="3" fill="#c084fc" opacity="0.4">
                    <animate
                      attributeName="opacity"
                      values="0.3;0.8;0.3"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <line
                    x1="22"
                    y1="22"
                    x2="78"
                    y2="38"
                    stroke="#a78bfa"
                    strokeWidth="0.5"
                    opacity="0.2"
                  />
                  <line
                    x1="82"
                    y1="42"
                    x2="138"
                    y2="22"
                    stroke="#a78bfa"
                    strokeWidth="0.5"
                    opacity="0.2"
                  />
                  <line
                    x1="62"
                    y1="98"
                    x2="158"
                    y2="82"
                    stroke="#c084fc"
                    strokeWidth="0.5"
                    opacity="0.15"
                  />
                  <line
                    x1="80"
                    y1="42"
                    x2="62"
                    y2="98"
                    stroke="#a78bfa"
                    strokeWidth="0.5"
                    opacity="0.15"
                  />
                </svg>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 relative">
                  <Cable size={20} className="text-accent" />
                  {/* Pulse ring */}
                  <div className="absolute -inset-1 rounded-lg border border-accent/20 animate-ping opacity-30" />
                </div>
                <p className="text-sm text-accent font-medium tracking-wider uppercase">
                  Integration Stories
                </p>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-100 mb-5 leading-tight">
                Plugging into the{" "}
                <span className="gradient-text italic">enterprise</span>{" "}
                ecosystem
              </h1>

              <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed mb-8">
                Practical guides to building enterprise integrations for
                B2B SaaS — architecture decisions, authentication flows,
                multi-tenant challenges, and hard-won lessons from connecting
                a product to the platforms enterprises live in.
              </p>

              {/* Visual flow indicator */}
              <div className="flex items-center gap-3 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                    <span className="text-[10px] font-mono font-bold text-zinc-400">
                      SaaS
                    </span>
                  </div>
                  <motion.div
                    className="flex items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="w-8 h-px bg-gradient-to-r from-zinc-700 to-accent/50" />
                    <Zap size={14} className="text-accent" />
                    <div className="w-8 h-px bg-gradient-to-r from-accent/50 to-zinc-700" />
                  </motion.div>
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                    <Plug size={14} className="text-zinc-400" />
                  </div>
                </div>
                <span className="text-zinc-600 ml-2">
                  {integrations.length} integration
                  {integrations.length !== 1 ? "s" : ""} documented
                </span>
              </div>
            </div>
          </AnimatedSection>

          {/* Integration cards */}
          <div className="space-y-6">
            {integrations.map((integration, i) => (
              <AnimatedSection key={integration.slug} delay={i * 0.1}>
                <Link
                  href={`/integrations/${integration.slug}`}
                  className="block cursor-pointer"
                >
                  <article className="group relative rounded-xl overflow-hidden border border-zinc-800/50 bg-[#0c0c0e] hover:border-accent/30 transition-all duration-500">
                    {/* Top accent line — represents the "connection" */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        {/* Platform icon block */}
                        <div className="shrink-0">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 flex items-center justify-center group-hover:border-accent/30 transition-colors duration-500">
                              <Plug
                                size={28}
                                className="text-zinc-500 group-hover:text-accent transition-colors duration-500"
                              />
                            </div>
                            {/* Connection dot */}
                            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0c0c0e]" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center flex-wrap gap-2.5 mb-3">
                            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/20">
                              {integration.platform}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                              <CheckCircle2 size={12} />
                              <span className="font-medium">
                                {integration.status === "live"
                                  ? "Live in Production"
                                  : integration.status}
                              </span>
                            </div>
                            <span className="text-xs text-zinc-500">
                              {integration.date} &middot;{" "}
                              {integration.readTime}
                            </span>
                          </div>

                          <h2 className="font-display text-xl md:text-2xl font-semibold text-zinc-100 group-hover:text-accent transition-colors mb-2 leading-snug">
                            {integration.title}
                          </h2>

                          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                            {integration.subtitle}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {integration.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800/60 text-zinc-500 border border-zinc-700/40"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Arrow */}
                        <ArrowUpRight
                          size={22}
                          className="text-zinc-700 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1 hidden md:block"
                        />
                      </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </article>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {/* Coming soon hint */}
          <AnimatedSection delay={0.3}>
            <div className="mt-12 p-6 rounded-xl border border-dashed border-zinc-800 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Cable size={16} className="text-zinc-600" />
                <p className="text-sm font-medium text-zinc-500">
                  More integrations coming soon
                </p>
              </div>
              <p className="text-xs text-zinc-600">
                Slack, Google Workspace, Okta SCIM, and more — stay tuned.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
