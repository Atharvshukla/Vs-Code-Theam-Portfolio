import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Plug } from "lucide-react";
import { Container, PageHeader, Reveal, SectionHeader, Stagger, StaggerItem, StatusDot, Tag } from "../../components/ui";
import { formatDate } from "../../components/article/ArticleShell";
import integrations from "../../data/integrations";

const queued = ["Slack", "Google Workspace", "Okta SCIM"];

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

      <PageHeader
        path="integrations"
        title="Integration guides from production."
        description="Practical guides to building enterprise integrations for B2B SaaS — architecture decisions, authentication flows, multi-tenant challenges, and hard-won lessons from connecting a product to the platforms enterprises live in."
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[12px] text-fg-dim">
          <StatusDot label={`${integrations.length} connectors in production`} />
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full border border-fg-faint" /> {queued.length} queued
          </span>
        </div>
      </PageHeader>

      <Container>
        <Stagger className="grid gap-5 md:grid-cols-2">
          {integrations.map((integration) => (
            <StaggerItem key={integration.slug}>
              <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }} className="h-full">
                <Link
                  href={`/integrations/${integration.slug}`}
                  className="panel panel-hover group flex h-full flex-col overflow-hidden"
                >
                  {/* Connector header: your product ⇄ platform */}
                  <div className="flex items-center gap-3 border-b border-ink-700 bg-ink-850/60 px-5 py-4">
                    <span className="rounded-md border border-ink-600 bg-ink-900 px-2 py-1 font-mono text-[11px] text-fg-muted">
                      saas
                    </span>
                    <span className="relative h-px flex-1 overflow-hidden bg-ink-600">
                      <motion.span
                        className="absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-accent to-transparent"
                        animate={{ x: ["-40px", "400px"] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                      />
                    </span>
                    <span className="flex items-center gap-1.5 rounded-md border border-ink-600 bg-ink-900 px-2 py-1 font-mono text-[11px] text-fg">
                      <Plug size={11} className="text-accent" />
                      {integration.platform}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <StatusDot label={integration.status === "published" ? "live in production" : integration.status} />
                      <ArrowUpRight
                        size={16}
                        className="text-fg-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </div>
                    <h2 className="text-lg font-semibold tracking-tight text-fg transition-colors group-hover:text-accent">
                      {integration.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{integration.subtitle}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {integration.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center gap-4 border-t border-ink-700 pt-4 font-mono text-[11px] text-fg-dim">
                      <time dateTime={integration.date}>{formatDate(integration.date)}</time>
                      <span className="flex items-center gap-1.5">
                        <Clock size={11} /> {integration.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-20">
          <SectionHeader
            label="queue"
            title="Coming next"
            description="More integrations coming soon — stay tuned."
          />
          <Reveal>
            <div className="overflow-hidden rounded-xl border border-dashed border-ink-600">
              {queued.map((name, i) => (
                <div
                  key={name}
                  className="flex items-center justify-between gap-4 border-b border-dashed border-ink-700 px-5 py-4 font-mono text-[13px] last:border-b-0"
                >
                  <span className="flex items-center gap-3 text-fg-muted">
                    <span className="text-fg-faint">{String(i + 1).padStart(2, "0")}</span>
                    {name}
                  </span>
                  <span className="flex items-center gap-2 text-[11px] text-fg-dim">
                    <span className="h-1.5 w-1.5 rounded-full border border-fg-faint" /> queued
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
