import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { skills } from "../../data";

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

// Per-group accent colors matching the warm palette
const groupConfig = {
  Frontend: {
    color: "#FF4B1F", // Ember
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  Backend: {
    color: "#FF9A4D", // Amber
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  "Tools & Languages": {
    color: "#73A5CA", // Steel Blue / Live
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
};

const FALLBACK_COLORS = ["#FF4B1F", "#FF9A4D", "#73A5CA", "#A78BFA"];

// Spiral geometry (radii are fractions of the container's half-size)
const R_START = 0.4;
const R_END = 0.88;
const SWEEP = 300; // degrees each arm winds
const SPIN_SECONDS = 100; // one full revolution
const AUTO_CYCLE_MS = 4500;

const rad = (deg) => (deg * Math.PI) / 180;

function armPoint(armIndex, armCount, t) {
  const base = (360 / armCount) * armIndex - 90;
  const r = R_START + (R_END - R_START) * t;
  const a = rad(base + SWEEP * t);
  return { x: 50 + r * 50 * Math.cos(a), y: 50 + r * 50 * Math.sin(a) };
}

function armPath(armIndex, armCount, steps = 80) {
  let d = "";
  for (let s = 0; s <= steps; s++) {
    const { x, y } = armPoint(armIndex, armCount, s / steps);
    d += `${s === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  return d;
}

/* ------------------------------------------------------------------ */
/* Motion variants (one orchestrated reveal when the section appears)  */
/* ------------------------------------------------------------------ */

const pathVariants = {
  hidden: { pathLength: 0 },
  visible: (delay) => ({
    pathLength: 1,
    transition: { duration: 1.6, delay, ease: "easeInOut" },
  }),
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: (delay) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 18, delay },
  }),
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function Skills() {
  const reduceMotion = useReducedMotion();

  const [hover, setHover] = useState(null); // { group, item } | null
  const [pinned, setPinned] = useState(null); // group name | null
  const [auto, setAuto] = useState(0);
  const [hovering, setHovering] = useState(false); // pointer is over the interactive area

  // Build arms + node positions once
  const arms = useMemo(
    () =>
      skills.map((group, gi) => {
        const cfg = groupConfig[group.group] ?? {
          color: FALLBACK_COLORS[gi % FALLBACK_COLORS.length],
          icon: null,
        };
        const n = group.items.length;
        const nodes = group.items.map((item, j) => {
          const t = n === 1 ? 0.5 : j / (n - 1);
          const { x, y } = armPoint(gi, skills.length, t);
          return { item, x, y, delay: 0.5 + gi * 0.15 + t * 1.1 };
        });
        return { ...group, ...cfg, gi, nodes, path: armPath(gi, skills.length) };
      }),
    []
  );

  // Gently cycle through groups until the visitor takes control
  useEffect(() => {
    if (pinned !== null || hovering || reduceMotion || arms.length < 2) return;
    const id = setInterval(() => setAuto((a) => (a + 1) % arms.length), AUTO_CYCLE_MS);
    return () => clearInterval(id);
  }, [pinned, hovering, reduceMotion, arms.length]);

  const activeGroup = hover?.group ?? pinned ?? arms[auto % arms.length]?.group;
  const activeArm = arms.find((a) => a.group === activeGroup) ?? arms[0];

  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-24">
      <style>{`
        @keyframes spiral-spin { to { transform: rotate(360deg); } }
        @keyframes spiral-counter { to { transform: rotate(-360deg); } }
        .spiral-spin { animation: spiral-spin ${SPIN_SECONDS}s linear infinite; }
        .spiral-counter { animation: spiral-counter ${SPIN_SECONDS}s linear infinite; }
        .spiral-root[data-paused="true"] .spiral-spin,
        .spiral-root[data-paused="true"] .spiral-counter { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .spiral-spin, .spiral-counter { animation: none; }
        }
      `}</style>

      {/* Section header */}
      <p className="font-mono text-xs uppercase tracking-widest text-live mb-3">
        [ Skills ]
      </p>
      <h2 className="font-display text-3xl font-semibold mb-2">What I work with</h2>
      <p className="text-text-muted mb-12 max-w-lg">
        Tools and technologies I use to build production-ready web apps.
      </p>

      <div
        className="spiral-root grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)]"
        data-paused={hovering}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => {
          setHovering(false);
          setHover(null);
        }}
      >
        {/* ---------------- Spiral ---------------- */}
        <motion.div
          aria-hidden="true"
          className="relative mx-auto aspect-square w-full max-w-[600px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Static guide rings */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-hairline">
            {[R_START, (R_START + R_END) / 2, R_END].map((r) => (
              <circle
                key={r}
                cx="50"
                cy="50"
                r={r * 50}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.25"
                strokeDasharray="0.8 1.6"
              />
            ))}
          </svg>

          {/* Rotating layer: arms + nodes */}
          <div className="spiral-spin absolute inset-0">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
              {arms.map((arm) => {
                const isActive = arm.group === activeGroup;
                return (
                  <motion.path
                    key={arm.group}
                    d={arm.path}
                    fill="none"
                    stroke={arm.color}
                    strokeWidth={isActive ? 0.55 : 0.3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    custom={arm.gi * 0.15}
                    variants={pathVariants}
                    className="transition-[opacity,stroke-width] duration-500"
                    style={{
                      opacity: isActive ? 0.95 : 0.28,
                      filter: isActive ? `drop-shadow(0 0 1.5px ${arm.color})` : "none",
                    }}
                  />
                );
              })}
            </svg>

            {arms.map((arm) =>
              arm.nodes.map((node) => {
                const isActive = arm.group === activeGroup;
                const isHovered = hover?.group === arm.group && hover?.item === node.item;
                const showLabel = isHovered || isActive;

                return (
                  <div
                    key={`${arm.group}-${node.item}`}
                    className="absolute"
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      transform: "translate(-50%, -50%)",
                      zIndex: isHovered ? 30 : isActive ? 20 : 10,
                    }}
                  >
                    {/* Counter-rotation keeps the text upright */}
                    <div className="spiral-counter">
                      <motion.div custom={node.delay} variants={nodeVariants}>
                        <div
                          onMouseEnter={() => setHover({ group: arm.group, item: node.item })}
                          onMouseLeave={() => setHover(null)}
                          onClick={() => setPinned(arm.group)}
                          className={`flex cursor-pointer items-center rounded-full border px-1.5 py-1 font-mono text-[10px] transition-all duration-300 ${
                            isActive ? "bg-surface" : "border-transparent"
                          } ${isHovered ? "scale-110" : ""}`}
                          style={{
                            borderColor: isActive ? `${arm.color}${isHovered ? "cc" : "55"}` : undefined,
                          }}
                        >
                          <span
                            className="h-2 w-2 shrink-0 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: arm.color,
                              opacity: isActive ? 1 : 0.55,
                              boxShadow: isActive ? `0 0 10px ${arm.color}` : "none",
                            }}
                          />
                          <span
                            className={`overflow-hidden whitespace-nowrap text-text-primary transition-all duration-300 ${
                              isHovered
                                ? "ml-1.5 max-w-[120px] opacity-100"
                                : showLabel
                                ? "max-w-0 opacity-0 sm:ml-1.5 sm:max-w-[120px] sm:opacity-100"
                                : "max-w-0 opacity-0"
                            }`}
                          >
                            {node.item}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Hub */}
          <div
            className="absolute left-1/2 top-1/2 z-20 flex aspect-square w-[28%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-surface text-center transition-all duration-500"
            style={{
              borderColor: `${activeArm.color}66`,
              boxShadow: `0 0 60px -12px ${activeArm.color}88`,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeArm.group}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="px-2"
              >
                <p className="font-display text-sm font-semibold leading-tight text-text-primary sm:text-lg">
                  {activeArm.group}
                </p>
                <p className="mt-1 font-mono text-[10px] text-text-muted">
                  {activeArm.items.length} skills
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ---------------- Group list ---------------- */}
        <div>
          <div className="border-t border-hairline">
            {arms.map((arm) => {
              const isActive = arm.group === activeGroup;
              const isPinned = pinned === arm.group;

              return (
                <div key={arm.group} className="border-b border-hairline">
                  <button
                    type="button"
                    onClick={() => setPinned((p) => (p === arm.group ? null : arm.group))}
                    aria-pressed={isPinned}
                    aria-expanded={isActive}
                    className="flex w-full items-center gap-3 rounded py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300"
                      style={{
                        color: arm.color,
                        backgroundColor: `${arm.color}${isActive ? "22" : "10"}`,
                        borderColor: `${arm.color}${isActive ? "66" : "30"}`,
                      }}
                    >
                      {arm.icon ?? <span className="h-2 w-2 rounded-full" style={{ backgroundColor: arm.color }} />}
                    </span>
                    <span
                      className={`font-display text-lg font-semibold transition-colors duration-300 ${
                        isActive ? "text-text-primary" : "text-text-muted"
                      }`}
                    >
                      {arm.group}
                    </span>
                    <span className="ml-auto font-mono text-xs text-text-muted">
                      {arm.items.length}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="flex flex-wrap gap-2 overflow-hidden pb-4"
                      >
                        {arm.items.map((item) => {
                          const isHovered = hover?.group === arm.group && hover?.item === item;
                          return (
                            <li
                              key={item}
                              onMouseEnter={() => setHover({ group: arm.group, item })}
                              onMouseLeave={() => setHover(null)}
                              className="cursor-default rounded-full border border-hairline bg-surface-raised px-3 py-1.5 font-mono text-xs transition-colors duration-200"
                              style={isHovered ? { borderColor: `${arm.color}99` } : undefined}
                            >
                              <span className={isHovered ? "text-text-primary" : "text-text-muted"}>
                                {item}
                              </span>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-sm text-text-muted">
            Hover the spiral to pause it. Select a group to keep it open.
          </p>
        </div>
      </div>
    </section>
  );
}