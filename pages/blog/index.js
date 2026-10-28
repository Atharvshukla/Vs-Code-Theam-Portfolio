import { useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, FileText, Search } from "lucide-react";
import { Container, PageHeader, Tag } from "../../components/ui";
import { formatDate } from "../../components/article/ArticleShell";
import blogPosts from "../../data/blog";

const posts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
const allTags = [...new Set(posts.flatMap((p) => p.tags))];

export default function Blog() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState(null);
  const [hovered, setHovered] = useState(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (!tag || p.tags.includes(tag)) &&
        (!q || `${p.title} ${p.excerpt} ${p.tags.join(" ")}`.toLowerCase().includes(q))
    );
  }, [query, tag]);

  return (
    <>
      <Head>
        <title>Blog — Atharv Shukla</title>
        <meta
          name="description"
          content="Notes from building products from scratch as a founding engineer: architecture, shipping, and what I learn along the way."
        />
      </Head>

      <PageHeader
        path="blog"
        title="Founding engineer, in writing."
        description="Notes from building products from zero: architecture decisions, shipping, and what I learn along the way at Mentorgain."
      />

      <Container>
        {/* Toolbar: grep + tag filter */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <label className="flex w-full items-center gap-2 rounded-lg border border-ink-700 bg-ink-900 px-3 md:max-w-xs">
            <Search size={14} className="text-fg-dim" />
            <span className="font-mono text-[12px] text-fg-faint">grep -i</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search posts"
              aria-label="Search posts"
              className="h-10 min-w-0 flex-1 bg-transparent font-mono text-[13px] text-fg placeholder:text-fg-faint focus:outline-none"
            />
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[null, ...allTags].map((t) => {
              const active = tag === t;
              return (
                <button
                  key={t ?? "all"}
                  onClick={() => setTag(t)}
                  className={`relative rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors ${
                    active ? "text-ink-950" : "text-fg-dim hover:text-fg"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="blog-tag"
                      className="absolute inset-0 rounded-md bg-accent"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{t ?? "all"}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ls -la style listing */}
        <div className="overflow-hidden rounded-xl border border-ink-700 bg-ink-900/60">
          <div className="flex items-center justify-between border-b border-ink-700 bg-ink-850 px-4 py-2.5 font-mono text-[11px] text-fg-dim sm:px-5">
            <span>
              <span className="text-accent">$</span> ls -lt ~/blog
            </span>
            <span>
              {visible.length} {visible.length === 1 ? "file" : "files"}
            </span>
          </div>

          <ul onMouseLeave={() => setHovered(null)}>
            <AnimatePresence initial={false}>
              {visible.map((post, i) => (
                <motion.li
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: i * 0.04 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className="relative border-b border-ink-700 last:border-b-0"
                  onMouseEnter={() => setHovered(post.slug)}
                >
                  {hovered === post.slug && (
                    <motion.span
                      layoutId="blog-row-hover"
                      className="absolute inset-0 bg-ink-800/70"
                      transition={{ type: "spring", bounce: 0.1, duration: 0.35 }}
                    />
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group relative grid gap-3 px-4 py-6 sm:px-5 md:grid-cols-[150px_minmax(0,1fr)_auto] md:gap-6"
                  >
                    <div className="flex items-center gap-3 font-mono text-[12px] text-fg-dim md:flex-col md:items-start md:gap-1.5">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span className="text-fg-faint">{post.readTime}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="mb-1.5 flex items-center gap-2 font-mono text-[11px] text-fg-faint">
                        <FileText size={11} />
                        <span className="truncate">{post.slug}.md</span>
                        {post.featured && <span className="text-accent">★ pinned</span>}
                      </p>
                      <h2 className="text-lg font-semibold tracking-tight text-fg transition-colors group-hover:text-accent md:text-xl">
                        {post.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-muted">{post.excerpt}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {post.tags.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="hidden shrink-0 text-fg-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:block"
                    />
                  </Link>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {visible.length === 0 && (
            <p className="px-5 py-12 text-center font-mono text-[13px] text-fg-dim">
              no posts match <span className="text-fg">&quot;{query || tag}&quot;</span>
            </p>
          )}
        </div>
      </Container>
    </>
  );
}
