import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../../data";
import ResumeModal from "../shared/ResumeModal";
import Dock from "./Dock";
import {
  Home,
  Briefcase,
  Cpu,
  User,
  Mail,
  FileText,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";

export default function Nav({ onViewWork }) {
  const [showResume, setShowResume] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { icon: <Home size={20} />, label: "Home", onClick: () => scrollTo("#top") },
    {
      icon: <Briefcase size={20} />,
      label: "Projects",
      onClick: () => (onViewWork ? onViewWork() : scrollTo("#work")),
    },
    { icon: <Cpu size={20} />, label: "Skills", onClick: () => scrollTo("#skills") },
    { icon: <User size={20} />, label: "About", onClick: () => scrollTo("#about") },
    { icon: <Mail size={20} />, label: "Contact", onClick: () => scrollTo("#contact") },
    { icon: <FileText size={20} />, label: "Resume", onClick: () => setShowResume(true) },
  ];

  // Dock items (desktop only)
  const dockItems = [
    ...navItems,
    {
      icon: theme === "dark" ? <Sun size={18} /> : <Moon size={18} />,
      label: theme === "dark" ? "Light Mode" : "Dark Mode",
      onClick: toggleTheme,
    },
  ];

  const handleMobileItemClick = (item) => {
    setMobileOpen(false);
    setTimeout(() => item.onClick(), 300); // wait for drawer close animation
  };

  return (
    <>
      {/* ── Header bar ─────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-transparent pointer-events-none">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
          {/* Logo */}
          <a
            href="#top"
            className="font-display font-semibold tracking-tight text-lg pointer-events-auto"
          >
            {profile.name}
            <span className="text-live">.</span>
          </a>

          {/* Mobile: hamburger + theme toggle */}
          <div className="flex items-center gap-3 md:hidden pointer-events-auto">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-hairline bg-surface text-text-muted hover:text-violet hover:border-violet transition-colors"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-hairline bg-surface text-text-primary hover:border-violet hover:text-violet transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Drawer ───────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-void/70 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-down drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-[72px] inset-x-4 z-50 rounded-2xl border border-hairline bg-surface/95 backdrop-blur-md shadow-2xl overflow-hidden md:hidden"
            >
              {/* Nav items grid */}
              <div className="p-4 grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleMobileItemClick(item)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-hairline bg-surface-raised text-text-muted hover:text-violet hover:border-violet hover:bg-violet/5 transition-all duration-200 text-left group"
                  >
                    <span className="text-text-muted group-hover:text-violet transition-colors">
                      {item.icon}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Divider + footer */}
              <div className="border-t border-hairline px-4 py-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                  {profile.name}<span className="text-live">.</span>
                </span>
                <span className="font-mono text-[10px] text-text-muted/50">
                  {navItems.length} sections
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Desktop Dock (hidden on mobile) ─────────── */}
      <div className="hidden md:block">
        <Dock items={dockItems} panelHeight={64} baseItemSize={46} magnification={62} />
      </div>

      {/* Resume Modal */}
      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </>
  );
}
