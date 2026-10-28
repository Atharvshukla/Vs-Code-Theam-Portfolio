import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Stagger, StaggerItem } from "../ui";

/** Screenshot grid that opens into a keyboard-navigable lightbox. */
export default function Gallery({ images, slug }) {
  const [open, setOpen] = useState(null);
  const [dir, setDir] = useState(0);

  const close = () => setOpen(null);
  const step = useCallback(
    (d) => {
      setDir(d);
      setOpen((i) => (i === null ? i : (i + d + images.length) % images.length));
    },
    [images.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  return (
    <>
      <Stagger className="grid gap-4 sm:grid-cols-2">
        {images.map((img, i) => (
          <StaggerItem key={img.src}>
            <motion.button
              layoutId={`${slug}-shot-${i}`}
              onClick={() => {
                setDir(0);
                setOpen(i);
              }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25 }}
              className="group block w-full overflow-hidden rounded-xl border border-ink-700 bg-ink-900 text-left"
            >
              <div className="overflow-hidden">
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <p className="flex items-center gap-2 border-t border-ink-700 px-4 py-3 text-[13px] text-fg-muted">
                <span className="font-mono text-[11px] text-fg-faint">{String(i + 1).padStart(2, "0")}</span>
                {img.caption}
              </p>
            </motion.button>
          </StaggerItem>
        ))}
      </Stagger>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Screenshot viewer"
          >
            <div className="flex items-center justify-between px-5 py-4 font-mono text-xs text-white/60">
              <span>
                {String(open + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              <button onClick={close} className="rounded-md p-2 text-white/70 hover:bg-white/10 hover:text-white" aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                <motion.figure
                  key={open}
                  layoutId={dir === 0 ? `${slug}-shot-${open}` : undefined}
                  custom={dir}
                  initial={dir === 0 ? false : { opacity: 0, x: dir * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -60 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) step(1);
                    else if (info.offset.x > 80) step(-1);
                  }}
                  className="max-h-full w-full max-w-6xl"
                >
                  <img
                    src={images[open].src}
                    alt={images[open].caption}
                    className="mx-auto max-h-[78vh] w-auto rounded-lg border border-white/10 object-contain"
                    draggable={false}
                  />
                  <figcaption className="mt-4 text-center text-sm text-white/70">{images[open].caption}</figcaption>
                </motion.figure>
              </AnimatePresence>
              <button
                onClick={() => step(-1)}
                className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-3 text-white/70 hover:text-white sm:block"
                aria-label="Previous screenshot"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => step(1)}
                className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/10 bg-black/50 p-3 text-white/70 hover:text-white sm:block"
                aria-label="Next screenshot"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
