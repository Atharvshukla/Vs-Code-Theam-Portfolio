import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Copy, FileText, Github, Linkedin, Search, Boxes } from "lucide-react";
import { navLinks, site } from "./site";
import { flagship } from "../data/projects";

function buildCommands(router) {
  const go = (href) => () => router.push(href);
  const open = (href) => () => window.open(href, "_blank", "noopener");
  return [
    { group: "Navigate", label: "Home", hint: "~/", icon: ArrowRight, run: go("/") },
    ...navLinks.map((l) => ({
      group: "Navigate",
      label: l.label[0].toUpperCase() + l.label.slice(1),
      hint: `~${l.href}`,
      icon: ArrowRight,
      run: go(l.href),
    })),
    ...flagship.map((p) => ({
      group: "Projects",
      label: p.name,
      hint: p.tagline,
      icon: Boxes,
      run: go(`/projects/${p.slug}`),
    })),
    ...flagship.map((p) => ({
      group: "Live demos",
      label: `Open ${p.name} live`,
      hint: p.links.live.replace("https://", ""),
      icon: ArrowRight,
      run: open(p.links.live),
    })),
    {
      group: "Actions",
      label: "Copy email address",
      hint: site.email,
      icon: Copy,
      run: () => navigator.clipboard?.writeText(site.email),
    },
    { group: "Actions", label: "Download resume", hint: "PDF", icon: FileText, run: open(site.resume) },
    { group: "Actions", label: "GitHub", hint: "@Atharvshukla", icon: Github, run: open(site.github) },
    { group: "Actions", label: "LinkedIn", hint: "in/iamatharv", icon: Linkedin, run: open(site.linkedin) },
  ];
}

export default function CommandPalette({ open, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const commands = useMemo(() => buildCommands(router), [router]);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.hint} ${c.group}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${index}"]`)?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const run = (cmd) => {
    onClose();
    cmd?.run();
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[index]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  let lastGroup = null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-xl border border-ink-600 bg-ink-900 shadow-2xl shadow-black/60"
          >
            <div className="flex items-center gap-3 border-b border-ink-700 px-4">
              <Search size={15} className="text-fg-dim" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a command or search…"
                className="h-12 flex-1 bg-transparent font-mono text-sm text-fg placeholder:text-fg-faint focus:outline-none"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
              />
              <kbd className="rounded border border-ink-600 px-1.5 py-0.5 font-mono text-[10px] text-fg-dim">esc</kbd>
            </div>
            <ul id="palette-list" ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-8 text-center font-mono text-sm text-fg-dim">
                  command not found: {query}
                </li>
              )}
              {results.map((cmd, i) => {
                const header = cmd.group !== lastGroup ? cmd.group : null;
                lastGroup = cmd.group;
                const Icon = cmd.icon;
                return (
                  <li key={`${cmd.group}-${cmd.label}`}>
                    {header && <p className="label px-3 pb-1.5 pt-3">{header}</p>}
                    <button
                      data-index={i}
                      role="option"
                      aria-selected={i === index}
                      onMouseMove={() => setIndex(i)}
                      onClick={() => run(cmd)}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        i === index ? "bg-ink-700 text-fg" : "text-fg-muted"
                      }`}
                    >
                      <Icon size={14} className={i === index ? "text-accent" : "text-fg-dim"} />
                      <span className="flex-1 truncate">{cmd.label}</span>
                      <span className="hidden truncate font-mono text-[11px] text-fg-dim sm:block sm:max-w-[45%]">
                        {cmd.hint}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-4 border-t border-ink-700 px-4 py-2 font-mono text-[10px] text-fg-dim">
              <span>↑↓ navigate</span>
              <span>↵ run</span>
              <span className="ml-auto">⌘K toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
