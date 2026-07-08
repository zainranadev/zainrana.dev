import { motion } from "framer-motion";
import { skills } from "../data";
import DecryptedText from "./DecryptedText";

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

// Config for float animations (out of phase)
const floatConfigs = [
  { duration: 5, delay: 0 },
  { duration: 6, delay: 0.5 },
  { duration: 5.5, delay: 1 }
];

// Container: stagger children
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

// Each skill pill: spring pop-in
const pillVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 18 },
  },
};

// Group card entrance
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Skills() {
  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 py-24">
      {/* Section header */}
      <p className="font-mono text-xs uppercase tracking-widest text-live mb-3">
        <DecryptedText text="[ Skills ]" animateOn="view" sequential={true} speed={80} />
      </p>
      <h2 className="font-display text-3xl font-semibold mb-2">What I work with</h2>
      <p className="text-text-muted mb-12 max-w-lg">
        Tools and technologies I use to build production-ready web apps.
      </p>

      {/* Group cards */}
      <div className="grid sm:grid-cols-3 gap-6">
        {skills.map((group, i) => {
          const cfg = groupConfig[group.group] || { color: "#FF4B1F", icon: null };
          const float = floatConfigs[i % floatConfigs.length];

          return (
            <motion.div
              key={group.group}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="h-full"
            >
              {/* Floating inner card */}
              <motion.div
                animate={{
                  y: [0, -8, 0, -4, 0],
                }}
                transition={{
                  duration: float.duration,
                  delay: float.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  y: -14,
                  scale: 1.02,
                  boxShadow: `0 20px 40px -15px ${cfg.color}30`,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="relative h-full group rounded-2xl border border-hairline bg-surface p-6 overflow-hidden
                           hover:border-[var(--accent)] transition-all duration-300 flex flex-col justify-between"
                style={{ "--accent": cfg.color }}
              >
                {/* Glow blob on hover */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: cfg.color }}
                />

                <div>
                  {/* Card header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center border"
                      style={{
                        backgroundColor: `${cfg.color}18`,
                        borderColor: `${cfg.color}40`,
                        color: cfg.color,
                      }}
                    >
                      {cfg.icon}
                    </div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted">
                      {group.group}
                    </h3>
                  </div>

                  {/* Skill pills with stagger */}
                  <motion.div
                    className="flex flex-wrap gap-2"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                  >
                    {group.items.map((item) => (
                      <motion.span
                        key={item}
                        variants={pillVariants}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="relative font-mono text-xs px-3 py-1.5 rounded-full border border-hairline
                                   bg-surface-raised text-text-muted cursor-default
                                   hover:text-text-primary transition-all duration-200"
                      >
                        {/* Pill hover glow */}
                        <span
                          className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200"
                          style={{ boxShadow: `inset 0 0 0 1px ${cfg.color}60` }}
                        />
                        <span className="relative">{item}</span>
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                {/* Count badge / footer */}
                <div className="mt-8 pt-4 border-t border-hairline flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                    {group.items.length} skills
                  </span>
                  <div className="flex gap-1">
                    {group.items.slice(0, 4).map((_, idx) => (
                      <div
                        key={idx}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: `${cfg.color}${idx === 0 ? "ff" : idx === 1 ? "cc" : idx === 2 ? "88" : "44"}` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
