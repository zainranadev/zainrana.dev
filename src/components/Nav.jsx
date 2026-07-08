import { useEffect, useState } from "react";
import { profile } from "../data";
import ResumeModal from "./ResumeModal";
import Dock from "./Dock";
import { Home, Briefcase, Cpu, User, Mail, FileText, Sun, Moon, MessageSquare } from "lucide-react";

export default function Nav({ onViewWork }) {
  const [showResume, setShowResume] = useState(false);
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const items = [
    { icon: <Home size={18} />, label: "Home", onClick: () => scrollTo("#top") },
    { icon: <Briefcase size={18} />, label: "Projects", onClick: () => onViewWork ? onViewWork() : scrollTo("#work") },
    { icon: <Cpu size={18} />, label: "Skills", onClick: () => scrollTo("#skills") },
    { icon: <User size={18} />, label: "About", onClick: () => scrollTo("#about") },
    { icon: <MessageSquare size={18} />, label: "Comments", onClick: () => scrollTo("#comments") },
    { icon: <Mail size={18} />, label: "Contact", onClick: () => scrollTo("#contact") },
    { icon: <FileText size={18} />, label: "Resume", onClick: () => setShowResume(true) },
    {
      icon: theme === "dark" ? <Sun size={18} /> : <Moon size={18} />,
      label: theme === "dark" ? "Light Mode" : "Dark Mode",
      onClick: toggleTheme,
    },
  ];

  return (
    <>
      {/* Header (Top Branding Only - Clicks pass through) */}
      <header className="fixed top-0 inset-x-0 z-40 bg-transparent pointer-events-none">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6">
          <a href="#top" className="font-display font-semibold tracking-tight text-lg pointer-events-auto">
            {profile.name}<span className="text-live">.</span>
          </a>

        </nav>
      </header>

      {/* Floating Top Dock Navigation */}
      <Dock items={items} panelHeight={64} baseItemSize={46} magnification={62} />

      {/* Resume Modal */}
      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}
    </>
  );
}
