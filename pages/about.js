import Head from "next/head";
import { motion } from "framer-motion";
import { experience, skills } from "../data/experience";
import { Button, Container, Reveal, SectionHeader, Stagger, StaggerItem, Tag, Window, ease } from "../components/ui";
import GitLog from "../components/GitLog";
import { site } from "../components/site";

const README = [
  ["role", "Founding Engineer, Mentorgain"],
  ["focus", "B2B SaaS · multi-tenancy · identity · AI agents"],
  ["education", "B.Tech CSE, VIT Vellore (8.57)"],
  ["certified", "AWS Cloud Practitioner"],
  ["location", site.location],
];

export default function About() {
  return (
    <>
      <Head>
        <title>About — Atharv Shukla</title>
      </Head>

      <Container className="pb-20 pt-16 md:pt-24">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-5 font-mono text-[13px] text-fg-dim">
          <span className="text-accent">$</span> cat ~/about.md
        </motion.p>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="text-balance text-4xl font-semibold tracking-tight text-fg md:text-6xl"
            >
              Engineer first. Owner always.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="mt-8 space-y-5 text-pretty text-lg leading-relaxed text-fg-muted"
            >
              <p>
                I&apos;m Atharv Shukla, the founding engineer at Mentorgain — a multi-tenant platform enterprises use to
                run mentoring programmes. I own it end to end: the data model, the API, the web app, AWS, releases, and
                the SOC&nbsp;2 and GDPR work that lets enterprise customers say yes.
              </p>
              <p>
                Being first means the decisions compound. The schema, the tenancy model and the deploy path you pick in
                week one are still there in year two, so I bias toward boring, well-understood technology and spend the
                novelty budget where customers feel it.
              </p>
              <p>
                Outside work I build products to go deeper than a job allows: <span className="text-fg">Relay</span>, a
                supervised multi-agent AI platform; <span className="text-fg">Upmarket</span>, SSO, SCIM and audit logs as
                an API; and <span className="text-fg">Vouch</span>, which automates security reviews. All three are live,
                and I write about what breaks.
              </p>
            </motion.div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={site.resume} external>
                Download resume
              </Button>
              <Button href="/projects" variant="secondary">
                See the projects
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="space-y-5"
          >
            <div className="overflow-hidden rounded-xl border border-ink-700">
              <img src="/atharv.jpg" alt="Atharv Shukla" className="aspect-[4/5] w-full object-cover grayscale-[35%]" />
            </div>
            <Window title="README.md" bodyClassName="divide-y divide-ink-700 font-mono text-[12px]">
              {README.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[90px_1fr] gap-3 px-4 py-2.5">
                  <span className="text-fg-dim">{k}</span>
                  <span className="text-fg-muted">{v}</span>
                </div>
              ))}
            </Window>
          </motion.div>
        </div>
      </Container>

      <Container className="py-16">
        <SectionHeader index="01" label="git log" title="Experience & education" />
        <GitLog entries={experience} />
      </Container>

      <Container className="py-16">
        <SectionHeader index="02" label="toolbox" title="What I reach for" />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g) => (
            <StaggerItem key={g.group} className="panel p-5">
              <p className="label mb-3">{g.group}</p>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      <Container className="py-16">
        <Reveal>
          <div className="panel flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
            <div>
              <p className="text-xl font-medium text-fg">Want the long version?</p>
              <p className="mt-1 text-fg-muted">The case studies go deep on architecture, trade-offs and production bugs.</p>
            </div>
            <Button href="/projects/relay">Start with Relay</Button>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
