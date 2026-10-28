import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const ease = [0.22, 1, 0.36, 1];

export function Container({ className = "", children }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 ${className}`}>{children}</div>;
}

/** Fades content up once it scrolls into view. */
export function Reveal({ children, delay = 0, y = 24, className = "", as = "div" }) {
  const Tag = motion[as];
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Parent/child variants for staggered lists. */
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
export const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export function Stagger({ children, className = "", as = "div" }) {
  const Tag = motion[as];
  return (
    <Tag
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ children, className = "", as = "div", ...rest }) {
  const Tag = motion[as];
  return (
    <Tag variants={item} className={className} {...rest}>
      {children}
    </Tag>
  );
}

/** `01 // label` heading used to open every section. */
export function SectionHeader({ index, label, title, description, action, className = "" }) {
  return (
    <Reveal className={`mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-2xl">
        <p className="label mb-3 flex items-center gap-2">
          {index && <span className="text-accent">{index}</span>}
          <span className="text-fg-faint">//</span>
          <span>{label}</span>
        </p>
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg md:text-4xl">{title}</h2>
        {description && <p className="mt-4 text-pretty leading-relaxed text-fg-muted">{description}</p>}
      </div>
      {action}
    </Reveal>
  );
}

export function PageHeader({ path, title, description, children }) {
  return (
    <Container className="pb-12 pt-16 md:pb-16 md:pt-24">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-5 font-mono text-[13px] text-fg-dim"
      >
        <span className="text-accent">$</span> cd ~/{path}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-fg md:text-6xl"
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease }}
          className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted"
        >
          {description}
        </motion.p>
      )}
      {children}
    </Container>
  );
}

export function Tag({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-ink-700 bg-ink-850 px-2 py-0.5 font-mono text-[11px] text-fg-muted ${className}`}
    >
      {children}
    </span>
  );
}

export function StatusDot({ color = "#34d399", label, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-[11px] text-fg-muted ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full" style={{ background: color }} />
        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: color }} />
      </span>
      {label}
    </span>
  );
}

/** A macOS-style window chrome for terminals, code and screenshots. */
export function Window({ title, children, className = "", bodyClassName = "", right }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-ink-700 bg-ink-900 shadow-2xl shadow-black/40 ${className}`}>
      <div className="flex h-9 items-center gap-3 border-b border-ink-700 bg-ink-850 px-3.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        </div>
        {title && <p className="flex-1 truncate text-center font-mono text-[11px] text-fg-dim">{title}</p>}
        {right ?? <span className="w-[42px]" />}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

export function Button({ href, children, variant = "primary", external, icon = true, className = "", ...rest }) {
  const styles = {
    primary: "bg-fg text-ink-950 hover:bg-white",
    accent: "bg-accent text-ink-950 hover:bg-accent-hover",
    secondary: "border border-ink-600 bg-ink-850 text-fg hover:border-ink-500 hover:bg-ink-800",
    ghost: "text-fg-muted hover:text-fg",
  }[variant];
  const Icon = external ? ArrowUpRight : ArrowRight;
  const cls = `group inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${styles} ${className}`;
  const content = (
    <>
      {children}
      {icon && (
        <Icon
          size={15}
          className={`transition-transform ${
            external ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-0.5"
          }`}
        />
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
