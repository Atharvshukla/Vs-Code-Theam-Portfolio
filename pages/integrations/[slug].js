import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Cable,
  CheckCircle2,
  Plug,
  ExternalLink,
} from "lucide-react";
import integrations from "../../data/integrations";

export async function getStaticPaths() {
  const paths = integrations.map((i) => ({
    params: { slug: i.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const integration = integrations.find((i) => i.slug === params.slug);
  return { props: { integration } };
}

export default function IntegrationPost({ integration }) {
  if (!integration) return null;

  const renderContent = (content) => {
    const lines = content.trim().split("\n");
    const elements = [];
    let inList = false;
    let listItems = [];
    let inCodeBlock = false;
    let codeLines = [];
    let codeLang = "";

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul
            key={`list-${elements.length}`}
            className="list-disc list-inside space-y-2 text-zinc-300 mb-6 pl-2"
          >
            {listItems.map((item, i) => (
              <li key={i} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code blocks
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <div
              key={`code-${elements.length}`}
              className="mb-6 rounded-xl overflow-hidden border border-zinc-800"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border-b border-zinc-800">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                </div>
                {codeLang && (
                  <span className="text-[10px] font-mono text-zinc-500 uppercase ml-2">
                    {codeLang}
                  </span>
                )}
              </div>
              <pre className="p-4 bg-[#0c0c0e] overflow-x-auto">
                <code className="text-sm font-mono text-zinc-300 leading-relaxed">
                  {codeLines.join("\n")}
                </code>
              </pre>
            </div>
          );
          codeLines = [];
          codeLang = "";
          inCodeBlock = false;
        } else {
          flushList();
          codeLang = line.replace("```", "").trim();
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        continue;
      }

      // Headings
      if (line.startsWith("## ")) {
        flushList();
        elements.push(
          <h2
            key={i}
            className="font-display text-2xl font-semibold text-zinc-100 mt-12 mb-4 flex items-center gap-3"
          >
            <div className="w-1 h-6 rounded-full bg-accent" />
            {line.replace("## ", "")}
          </h2>
        );
        continue;
      }

      if (line.startsWith("### ")) {
        flushList();
        elements.push(
          <h3
            key={i}
            className="font-display text-lg font-semibold text-zinc-200 mt-8 mb-3"
          >
            {line.replace("### ", "")}
          </h3>
        );
        continue;
      }

      // Bold standalone lines
      if (
        line.startsWith("**") &&
        line.endsWith("**") &&
        !line.includes("**", 2)
      ) {
        flushList();
        elements.push(
          <p
            key={i}
            className="text-zinc-200 font-semibold mt-4 mb-2 leading-relaxed"
          >
            {line.replace(/\*\*/g, "")}
          </p>
        );
        continue;
      }

      // List items
      if (line.startsWith("- ") || line.startsWith("* ")) {
        inList = true;
        const text = line.replace(/^[-*] /, "");
        listItems.push(text);
        continue;
      }

      // Numbered list items
      if (/^\d+\.\s/.test(line)) {
        inList = true;
        const text = line.replace(/^\d+\.\s/, "");
        listItems.push(text);
        continue;
      }

      // Horizontal rule
      if (line.startsWith("---")) {
        flushList();
        elements.push(<hr key={i} className="border-zinc-800 my-10" />);
        continue;
      }

      // Empty lines
      if (line.trim() === "") {
        flushList();
        continue;
      }

      flushList();

      // Regular paragraph with inline formatting
      const parts = line.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
      elements.push(
        <p key={i} className="text-zinc-300 leading-relaxed mb-4">
          {parts.map((part, j) => {
            if (part.startsWith("`") && part.endsWith("`")) {
              return (
                <code
                  key={j}
                  className="text-sm font-mono bg-zinc-800/80 text-accent px-1.5 py-0.5 rounded border border-zinc-700/50"
                >
                  {part.slice(1, -1)}
                </code>
              );
            }
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={j} className="text-zinc-100 font-semibold">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    }

    flushList();
    return elements;
  };

  return (
    <>
      <Head>
        <title>{integration.title} — Atharv Shukla</title>
        <meta name="description" content={integration.subtitle} />
      </Head>

      <article className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/integrations"
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-accent transition-colors cursor-pointer mb-10"
            >
              <ArrowLeft size={16} />
              All integrations
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            {/* Platform badge + status */}
            <div className="flex items-center flex-wrap gap-3 mb-5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20">
                <Cable size={16} className="text-accent" />
                <span className="text-sm font-mono font-semibold text-accent">
                  {integration.platform}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <CheckCircle2 size={13} />
                <span className="font-medium">Live in Production</span>
              </div>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-zinc-100 leading-tight mb-4">
              {integration.title}
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed italic mb-6">
              {integration.subtitle}
            </p>

            <div className="flex items-center flex-wrap gap-4 text-sm text-zinc-500 mb-6">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <time>
                  {new Date(integration.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{integration.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {integration.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.header>

          {/* Visual connector line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-px mb-12 origin-left"
            style={{
              background:
                "linear-gradient(90deg, rgba(167,139,250,0.5), rgba(167,139,250,0.1), transparent)",
            }}
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {renderContent(integration.content)}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-8 border-t border-zinc-800"
          >
            <div className="flex items-center justify-between">
              <Link
                href="/integrations"
                className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-accent transition-colors cursor-pointer"
              >
                <ArrowLeft size={16} />
                All integrations
              </Link>
              <p className="text-xs text-zinc-600 italic">
                By Atharv Shukla, Founding Engineer
              </p>
            </div>
          </motion.div>
        </div>
      </article>
    </>
  );
}
