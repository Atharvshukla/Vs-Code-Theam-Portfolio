import { motion } from "framer-motion";
import { ease } from "./ui";

/** Experience rendered as `git log --graph`. */
export default function GitLog({ entries, compact = false }) {
  return (
    <ol className="relative">
      <div className="absolute bottom-2 left-[7px] top-2 w-px bg-ink-600" aria-hidden />
      {entries.map((e, i) => (
        <motion.li
          key={e.hash}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.06, ease }}
          className="relative grid grid-cols-[15px_1fr] gap-5 pb-10 last:pb-0"
        >
          <span
            className={`relative z-10 mt-1.5 h-[15px] w-[15px] rounded-full border-2 ${
              i === 0 ? "border-accent bg-accent/20" : "border-ink-500 bg-ink-950"
            }`}
          />
          <div className="min-w-0">
            <p className="font-mono text-[12px] text-fg-dim">
              <span className="text-amber-300/90">commit {e.hash}</span>
              {e.ref && <span className="text-accent"> ({e.ref})</span>}
              <span className="ml-2 text-fg-faint">· {e.period}</span>
            </p>
            <h3 className="mt-2 text-lg font-medium text-fg">
              {e.title} <span className="text-fg-dim">@ {e.org}</span>
            </h3>
            {e.summary && <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-fg-muted">{e.summary}</p>}
            {e.points.length > 0 && (
              <ul className="mt-4 max-w-3xl space-y-2.5">
                {(compact ? e.points.slice(0, 4) : e.points).map((pt) => (
                  <li key={pt} className="grid grid-cols-[14px_1fr] gap-2 text-sm leading-relaxed text-fg-muted">
                    <span className="font-mono text-accent">+</span>
                    {pt}
                  </li>
                ))}
              </ul>
            )}
            {e.stack.length > 0 && (
              <p className="mt-4 font-mono text-[11px] text-fg-dim">{e.stack.join(" · ")}</p>
            )}
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
