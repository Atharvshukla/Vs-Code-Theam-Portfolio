import Head from "next/head";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Code2, Copy, FileText, Github, Linkedin, Mail } from "lucide-react";
import { Container, PageHeader, Stagger, StaggerItem, Window } from "../components/ui";
import { site } from "../components/site";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail, note: "fastest way to reach me" },
  { label: "LinkedIn", value: "in/iamatharv", href: site.linkedin, icon: Linkedin, note: "for intros and roles" },
  { label: "GitHub", value: "@Atharvshukla", href: site.github, icon: Github, note: "code and experiments" },
  { label: "LeetCode", value: "u/imatharv", href: site.leetcode, icon: Code2, note: "problem solving" },
  { label: "Resume", value: "Atharv_Shukla_Resume.pdf", href: site.resume, icon: FileText, note: "one page, PDF" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <>
      <Head>
        <title>Contact — Atharv Shukla</title>
      </Head>

      <PageHeader
        path="contact"
        title="Let's build something that ships."
        description="Founding roles, hard backend problems, enterprise integrations or a second pair of eyes on an architecture — I'm happy to talk."
      />

      <Container className="grid gap-10 pb-10 lg:grid-cols-[1fr_1.1fr]">
        <Window title="~/contact.sh" bodyClassName="p-6 font-mono text-[13px] leading-[1.9]">
          <p className="text-fg-dim"># copy my address, or open your mail client</p>
          <p>
            <span className="text-accent">export</span> <span className="text-sky-300/90">EMAIL</span>
            <span className="text-fg-dim">=</span>
            <span className="break-all text-amber-200/90">&quot;{site.email}&quot;</span>
          </p>
          <p className="mt-3">
            <span className="text-accent">$</span> <span className="text-fg">mail -s &quot;Hi Atharv&quot; $EMAIL</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-3 font-sans">
            <button
              onClick={copy}
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-lg border border-ink-600 bg-ink-850 px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-ink-500"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "done" : "copy"}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center gap-2"
                >
                  {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
                  {copied ? "Copied" : "Copy email"}
                </motion.span>
              </AnimatePresence>
            </button>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-ink-950 transition-colors hover:bg-accent-hover"
            >
              <Mail size={15} /> Open mail
            </a>
          </div>
        </Window>

        <Stagger as="ul" className="divide-y divide-ink-700 overflow-hidden rounded-xl border border-ink-700">
          {channels.map(({ label, value, href, icon: Icon, note }) => (
            <StaggerItem as="li" key={label}>
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-ink-900 px-5 py-4 transition-colors hover:bg-ink-850"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-ink-700 text-fg-dim transition-colors group-hover:text-accent">
                  <Icon size={17} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-fg">{label}</span>
                  <span className="block truncate font-mono text-[12px] text-fg-dim">{value}</span>
                </span>
                <span className="hidden text-[12px] text-fg-faint sm:block">{note}</span>
                <ArrowUpRight size={15} className="shrink-0 text-fg-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </>
  );
}
