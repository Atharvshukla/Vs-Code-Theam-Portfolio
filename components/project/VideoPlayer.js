import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";

const fmt = (s) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

/** Demo player with chapter markers; the chapter list doubles as navigation. */
export default function VideoPlayer({ src, poster, chapters = [], title, color = "#34d399" }) {
  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const current = chapters.reduce((acc, c, i) => (time >= c.t ? i : acc), 0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setTime(v.currentTime);
    const onMeta = () => setDuration(v.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const play = () => {
    setStarted(true);
    videoRef.current?.play();
  };
  const toggle = () => (videoRef.current?.paused ? play() : videoRef.current?.pause());
  const seek = (t) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = t;
    play();
  };
  const onScrub = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    seek(ratio * (duration || 0));
  };
  const fullscreen = () => {
    const el = frameRef.current;
    if (document.fullscreenElement) document.exitFullscreen();
    else if (el?.requestFullscreen) el.requestFullscreen();
    else videoRef.current?.webkitEnterFullscreen?.();
  };
  const onKeyDown = (e) => {
    if (e.key === " " || e.key === "k") {
      e.preventDefault();
      toggle();
    } else if (e.key === "ArrowRight") seek(Math.min(time + 5, duration));
    else if (e.key === "ArrowLeft") seek(Math.max(time - 5, 0));
    else if (e.key === "m") {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    } else if (e.key === "f") fullscreen();
  };

  const progress = duration ? (time / duration) * 100 : 0;

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
      <div
        ref={frameRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label={`${title} demo video. Space to play or pause, arrow keys to seek.`}
        className="group relative overflow-hidden rounded-xl border border-ink-700 bg-black"
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="metadata"
          playsInline
          onClick={toggle}
          className="aspect-video w-full cursor-pointer bg-black"
        />

        <AnimatePresence>
          {!started && (
            <motion.button
              key="overlay"
              onClick={play}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 grid place-items-center bg-gradient-to-t from-black/70 via-black/20 to-black/10"
              aria-label="Play demo"
            >
              <motion.span
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-3 rounded-full border border-white/15 bg-black/60 py-3 pl-3 pr-5 backdrop-blur-md"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full" style={{ background: color }}>
                  <Play size={18} className="ml-0.5 fill-ink-950 text-ink-950" />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-medium text-white">Watch the demo</span>
                  <span className="block font-mono text-[11px] text-white/60">
                    {duration ? fmt(duration) : "1:30"} · narrated walkthrough
                  </span>
                </span>
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>

        {started && (
          <div
            className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-3 pb-2.5 pt-10 transition-opacity duration-300 ${
              playing ? "opacity-0 group-focus-within:opacity-100 group-hover:opacity-100" : "opacity-100"
            }`}
          >
            <div
              role="slider"
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration)}
              aria-valuenow={Math.round(time)}
              onClick={onScrub}
              className="relative mb-2 h-1.5 cursor-pointer rounded-full bg-white/15"
            >
              <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${progress}%`, background: color }} />
              {duration > 0 &&
                chapters.slice(1).map((c) => (
                  <span
                    key={c.t}
                    className="absolute top-1/2 h-2.5 w-0.5 -translate-y-1/2 bg-black/70"
                    style={{ left: `${(c.t / duration) * 100}%` }}
                  />
                ))}
            </div>
            <div className="flex items-center gap-3 text-white">
              <button onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="p-1">
                {playing ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button
                onClick={() => {
                  videoRef.current.muted = !muted;
                  setMuted(!muted);
                }}
                aria-label={muted ? "Unmute" : "Mute"}
                className="p-1"
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <span className="font-mono text-[11px] text-white/70">
                {fmt(time)} / {fmt(duration)}
              </span>
              <span className="hidden truncate font-mono text-[11px] text-white/50 sm:block">
                {chapters[current]?.label}
              </span>
              <button onClick={fullscreen} aria-label="Fullscreen" className="ml-auto p-1">
                <Maximize2 size={15} />
              </button>
            </div>
          </div>
        )}
      </div>

      {chapters.length > 0 && (
        <div className="panel flex flex-col overflow-hidden">
          <p className="label border-b border-ink-700 px-4 py-3">chapters</p>
          <ol className="flex-1 overflow-y-auto p-1.5 max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1">
            {chapters.map((c, i) => {
              const active = started && i === current;
              return (
                <li key={c.t}>
                  <button
                    onClick={() => seek(c.t)}
                    className={`relative flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[13px] transition-colors ${
                      active ? "text-fg" : "text-fg-dim hover:bg-ink-850 hover:text-fg"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId={`chapter-${title}`}
                        className="absolute inset-0 rounded-md border border-ink-600 bg-ink-800"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                      />
                    )}
                    <span className="relative w-9 shrink-0 font-mono text-[11px]" style={{ color: active ? color : undefined }}>
                      {fmt(c.t)}
                    </span>
                    <span className="relative truncate">{c.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}
