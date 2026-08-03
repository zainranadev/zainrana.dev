import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile, stats } from "../../data";
import DecryptedText from "../shared/DecryptedText";

function CountUp({ target, suffix = "" }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const duration = 900;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

export default function Hero({ onViewWork }) {
  return (
    <section id="top" className="max-w-6xl mx-auto px-6 pt-40 pb-24 grid md:grid-cols-[1.2fr_1fr] gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="font-mono text-xs uppercase tracking-widest text-live mb-5 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-live animate-pulse" />
          <DecryptedText text="Open to work" animateOn="view" sequential={true} speed={60} />
        </p>
        <h1 className="font-display text-5xl sm:text-6xl font-semibold leading-[1.05] text-balance">
          <DecryptedText
            text={profile.name}
            animateOn="hover"
            useOriginalCharsOnly={true}
            className="text-text-primary"
          />
          , building
          <br />
          <DecryptedText
            text="real-time"
            animateOn="hover"
            speed={40}
            className="text-violet"
            encryptedClassName="text-live"
          />{" "}
          web platforms.
        </h1>
        <p className="mt-6 text-text-muted text-lg max-w-md leading-relaxed">
          <DecryptedText
            text={profile.pitch}
            animateOn="hover"
            speed={25}
            maxIterations={15}
            className="text-text-muted"
          />
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (onViewWork) {
                onViewWork();
              } else {
                const el = document.querySelector("#work");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="font-mono text-xs uppercase tracking-widest bg-violet text-void px-6 py-3 rounded-full hover:bg-violet/90 transition-colors cursor-pointer"
          >
            View work
          </button>
          <a
            href="#contact"
            className="font-mono text-xs uppercase tracking-widest border border-hairline px-6 py-3 rounded-full hover:border-violet hover:text-violet transition-colors"
          >
            Get in touch
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="relative rounded-2xl border border-hairline bg-surface p-6 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(90deg,white_0px,white_1px,transparent_1px,transparent_4px)]" />
        <div className="relative flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-text-muted mb-6">
          <span>Scoreboard</span>
          <span className="text-live">● Live</span>
        </div>
        <div className="relative space-y-5">
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline justify-between border-b border-hairline pb-3">
              <span className="font-mono text-xs text-text-muted uppercase tracking-wide">{s.label}</span>
              <span className="font-mono text-3xl font-medium text-text-primary">
                <CountUp target={s.value} suffix={s.suffix} />
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
