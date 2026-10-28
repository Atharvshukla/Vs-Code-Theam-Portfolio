import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { Container, Tag, ease } from "../ui";
import Markdown, { extractHeadings } from "./Markdown";

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
    />
  );
}

function useActiveHeading(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (!ids.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function Toc({ headings }) {
  const active = useActiveHeading(headings.map((h) => h.id));
  if (!headings.length) return null;
  return (
    <nav aria-label="On this page" className="sticky top-24">
      <p className="label mb-4">
        <span className="text-fg-faint">//</span> on this page
      </p>
      <ul className="relative space-y-1 border-l border-ink-700">
        {headings.map((h) => {
          const isActive = h.id === active;
          return (
            <li key={h.id} className="relative">
              {isActive && (
                <motion.span
                  layoutId="toc-active"
                  className="absolute -left-px top-0 h-full w-px bg-accent"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                />
              )}
              <a
                href={`#${h.id}`}
                className={`block py-1 pl-4 text-[13px] leading-snug transition-colors ${
                  isActive ? "text-fg" : "text-fg-dim hover:text-fg-muted"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function PagerLink({ entry, direction, base }) {
  if (!entry) return <div className="hidden sm:block" />;
  const prev = direction === "prev";
  return (
    <Link
      href={`${base}/${entry.slug}`}
      className={`panel panel-hover group flex flex-col gap-2 p-5 ${prev ? "" : "sm:items-end sm:text-right"}`}
    >
      <span className="label flex items-center gap-1.5">
        {prev && <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5" />}
        {prev ? "previous" : "next"}
        {!prev && <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />}
      </span>
      <span className="text-sm font-medium text-fg transition-colors group-hover:text-accent">{entry.title}</span>
    </Link>
  );
}

/**
 * Shared layout for blog posts and integration guides:
 * shell-path breadcrumb, header, markdown body, sticky TOC and prev/next.
 */
export default function ArticleShell({
  base,
  backLabel,
  slug,
  title,
  description,
  date,
  readTime,
  tags = [],
  badges,
  content,
  prev,
  next,
  footerNote,
}) {
  const headings = extractHeadings(content);

  return (
    <>
      <ReadingProgress />
      <Container className="pb-10 pt-12 md:pt-20">
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link
            href={base}
            className="group mb-8 inline-flex items-center gap-2 font-mono text-[13px] text-fg-dim transition-colors hover:text-fg"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            cd ~{base}
          </Link>
          <p className="mb-5 break-all font-mono text-[12px] text-fg-faint">
            ~{base}/<span className="text-fg-muted">{slug}.md</span>
          </p>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="max-w-3xl"
        >
          {badges && <div className="mb-5 flex flex-wrap items-center gap-3">{badges}</div>}
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-fg md:text-5xl md:leading-[1.1]">
            {title}
          </h1>
          {description && <p className="mt-5 text-pretty text-lg leading-relaxed text-fg-muted">{description}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[12px] text-fg-dim">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} /> <time dateTime={date}>{formatDate(date)}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> {readTime}
            </span>
          </div>
          {tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}
        </motion.header>
      </Container>

      <Container>
        <div className="border-t border-ink-700 pt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-14">
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="min-w-0 max-w-3xl"
          >
            <Markdown content={content} />
            {footerNote && <p className="mt-12 font-mono text-[12px] text-fg-dim">{footerNote}</p>}
          </motion.article>
          <aside className="hidden lg:block">
            <Toc headings={headings} />
          </aside>
        </div>

        <div className="mt-16 grid gap-4 border-t border-ink-700 pt-10 sm:grid-cols-2">
          <PagerLink entry={prev} direction="prev" base={base} />
          <PagerLink entry={next} direction="next" base={base} />
        </div>
        <div className="mt-8">
          <Link
            href={base}
            className="group inline-flex items-center gap-2 font-mono text-[13px] text-fg-dim transition-colors hover:text-fg"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            back to ~{base} {backLabel ? <span className="text-fg-faint">({backLabel})</span> : null}
          </Link>
        </div>
      </Container>
    </>
  );
}
