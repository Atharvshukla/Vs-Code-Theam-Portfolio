import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Window } from "./ui";

const SCRIPT = [
  { cmd: "whoami", out: [["atharv shukla", "fg"], ["founding engineer · mentorgain", "dim"]] },
  {
    cmd: "cat stack.json | jq '.daily'",
    out: [['["typescript", "nestjs", "react", "postgres", "aws", "langgraph"]', "accent"]],
  },
  {
    cmd: "ls ~/shipped",
    out: [["relay/  upmarket/  vouch/  mentorgain/", "fg"]],
  },
  {
    cmd: "curl -s status.atharv.dev",
    out: [["● relay     live", "ok"], ["● upmarket  live", "ok"], ["● vouch     live", "ok"]],
  },
];

const tone = {
  fg: "text-fg",
  dim: "text-fg-dim",
  accent: "text-amber-200/90",
  ok: "text-accent",
};

/** Types each command, then prints its output, like a real session. */
export default function Terminal() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0); // index of the command being typed
  const [typed, setTyped] = useState(0); // characters typed of that command
  const done = step >= SCRIPT.length;

  useEffect(() => {
    if (reduce) {
      setStep(SCRIPT.length);
      return;
    }
    if (done) return;
    const cmd = SCRIPT[step].cmd;
    if (typed < cmd.length) {
      const t = setTimeout(() => setTyped((n) => n + 1), 38 + Math.random() * 50);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setStep((s) => s + 1);
      setTyped(0);
    }, 520);
    return () => clearTimeout(t);
  }, [step, typed, done, reduce]);

  const prompt = (
    <span>
      <span className="text-accent">atharv</span>
      <span className="text-fg-faint">@</span>
      <span className="text-fg-muted">dev</span> <span className="text-sky-300/80">~</span>{" "}
      <span className="text-fg-faint">$</span>{" "}
    </span>
  );

  return (
    <Window title="zsh — atharv@dev: ~" className="w-full" bodyClassName="min-h-[300px] p-5 font-mono text-[12.5px] leading-[1.75]">
      {SCRIPT.slice(0, Math.min(step, SCRIPT.length)).map((line) => (
        <div key={line.cmd} className="mb-2">
          <p className="break-words">
            {prompt}
            <span className="text-fg">{line.cmd}</span>
          </p>
          {line.out.map(([text, t]) => (
            <p key={text} className={`whitespace-pre-wrap break-words ${tone[t]}`}>
              {text}
            </p>
          ))}
        </div>
      ))}
      <p className="break-words">
        {prompt}
        {!done && <span className="text-fg">{SCRIPT[step].cmd.slice(0, typed)}</span>}
        <span className="ml-px inline-block h-[15px] w-[8px] translate-y-[3px] animate-blink bg-fg/80" />
      </p>
    </Window>
  );
}
