import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { Reveal, Stagger, StaggerItem, ease } from "../ui";

/** Thin bar pinned under the navbar that tracks reading progress. */
export function ScrollProgress({ color }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-16 z-40 h-px origin-left"
      style={{ scaleX, background: color }}
    />
  );
}

/** Sticky table of contents with scroll-spy. */
export function Toc({ sections, color }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="On this page" className="sticky top-28">
      <p className="label mb-4">on this page</p>
      <ul className="relative space-y-0.5 border-l border-ink-700">
        {sections.map((s, i) => {
          const isActive = active === s.id;
          return (
            <li key={s.id} className="relative">
              {isActive && (
                <motion.span
                  layoutId="toc-active"
                  className="absolute -left-px top-0 h-full w-px"
                  style={{ background: color }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                />
              )}
              <a
                href={`#${s.id}`}
                className={`flex items-center gap-2.5 py-1.5 pl-4 text-[13px] transition-colors ${
                  isActive ? "text-fg" : "text-fg-dim hover:text-fg-muted"
                }`}
              >
                <span className="font-mono text-[10px] text-fg-faint">{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Section({ id, index, label, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-ink-700 py-16 first:border-t-0 first:pt-0">
      <Reveal className="mb-8">
        <p className="label mb-3 flex items-center gap-2">
          <span className="text-fg-faint">{index}</span>
          <span className="text-fg-faint">//</span>
          {label}
        </p>
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-fg md:text-3xl">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}

/** Vertical pipeline whose rail fills as you scroll through it. */
export function FlowSteps({ steps, color }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div ref={ref} className="relative">
      <div className="absolute bottom-3 left-[15px] top-3 w-px bg-ink-700" />
      <motion.div
        className="absolute bottom-3 left-[15px] top-3 w-px origin-top"
        style={{ scaleY, background: color }}
      />
      <ol className="space-y-8">
        {steps.map((s, i) => (
          <motion.li
            key={s.title}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-25% 0px" }}
            transition={{ duration: 0.5, ease }}
            className="relative grid grid-cols-[32px_1fr] gap-5"
          >
            <motion.span
              initial={{ borderColor: "#2e2e36", color: "#71717a" }}
              whileInView={{ borderColor: color, color }}
              viewport={{ once: true, margin: "-35% 0px" }}
              transition={{ duration: 0.4 }}
              className="relative z-10 grid h-8 w-8 place-items-center rounded-full border bg-ink-950 font-mono text-[11px]"
            >
              {String(i + 1).padStart(2, "0")}
            </motion.span>
            <div className="pt-1">
              <h3 className="font-medium text-fg">{s.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">{s.body}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/** Layered architecture: each tier is a row, connected by animated packets. */
export function Architecture({ layers, color }) {
  return (
    <div className="panel bg-dots overflow-hidden p-4 sm:p-6">
      {layers.map((layer, i) => (
        <div key={layer.label}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.06, ease }}
            className="grid gap-3 sm:grid-cols-[150px_1fr] sm:items-center"
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-fg-dim">{layer.label}</p>
            <div className="flex flex-wrap gap-2">
              {layer.nodes.map((n) => (
                <span
                  key={n}
                  className="rounded-md border border-ink-600 bg-ink-850/90 px-3 py-1.5 font-mono text-[12px] text-fg-muted transition-colors hover:text-fg"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
                >
                  {n}
                </span>
              ))}
            </div>
          </motion.div>
          {i < layers.length - 1 && (
            <div className="relative my-2 h-8 sm:ml-[150px]" aria-hidden>
              <div className="absolute left-6 top-0 h-full w-px bg-ink-600" />
              <motion.span
                className="absolute left-[21px] h-2 w-2 rounded-full"
                style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                animate={{ top: ["-4px", "28px"], opacity: [0, 1, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function FeatureGrid({ features, color }) {
  return (
    <Stagger className="grid gap-px overflow-hidden rounded-xl border border-ink-700 bg-ink-700 sm:grid-cols-2">
      {features.map((f, i) => (
        <StaggerItem key={f.title} className="group relative bg-ink-900 p-6 transition-colors hover:bg-ink-850">
          <span
            className="absolute left-0 top-6 h-5 w-px opacity-0 transition-opacity group-hover:opacity-100"
            style={{ background: color }}
          />
          <p className="mb-2 font-mono text-[11px] text-fg-faint">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="font-medium text-fg">{f.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">{f.body}</p>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Architecture decision records as an accordion. */
export function Decisions({ decisions, color }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-3">
      {decisions.map((d, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={d.title} delay={i * 0.04}>
            <div className={`panel overflow-hidden transition-colors ${isOpen ? "border-ink-500" : ""}`}>
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <span className="font-mono text-[11px] text-fg-faint">ADR-{String(i + 1).padStart(3, "0")}</span>
                <span className="flex-1 font-medium text-fg">{d.title}</span>
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown size={16} className="text-fg-dim" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <dl className="grid gap-4 border-t border-ink-700 px-5 py-5 text-sm leading-relaxed md:grid-cols-3">
                      {[
                        ["decision", d.choice],
                        ["why", d.why],
                        ["trade-off", d.tradeoff],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <dt className="mb-1.5 font-mono text-[11px] uppercase tracking-wider" style={{ color: k === "decision" ? color : undefined }}>
                            <span className={k === "decision" ? "" : "text-fg-dim"}>{k}</span>
                          </dt>
                          <dd className="text-fg-muted">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export function Checklist({ title, items, color }) {
  return (
    <div className="panel p-5 sm:p-6">
      <p className="label mb-4">{title}</p>
      <Stagger as="ul" className="space-y-3">
        {items.map((it) => (
          <StaggerItem as="li" key={it} className="flex gap-3 text-sm leading-relaxed text-fg-muted">
            <Check size={15} className="mt-0.5 shrink-0" style={{ color }} />
            {it}
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
