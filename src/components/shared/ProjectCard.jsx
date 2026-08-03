import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Code2, Heart, Share2, X, Copy, Check } from "lucide-react";

// Tag → gradient color map for the banner
const tagColors = {
  "REAL-TIME · AI": "from-violet/30 via-violet/10 to-transparent",
  "FULL-STACK":     "from-live/30 via-live/10 to-transparent",
  "AUTOMATION":     "from-violet-deep/30 via-violet-deep/10 to-transparent",
  "UTILITY":        "from-text-muted/20 via-text-muted/5 to-transparent",
};

// Tag → icon letter avatar
const tagInitials = {
  "REAL-TIME · AI": "AI",
  "FULL-STACK":     "FS",
  "AUTOMATION":     "AT",
  "UTILITY":        "UT",
};

const tagAvatarColor = {
  "REAL-TIME · AI": "bg-violet/15 text-violet border-violet/30",
  "FULL-STACK":     "bg-live/15 text-live border-live/30",
  "AUTOMATION":     "bg-violet-deep/15 text-violet-deep border-violet-deep/30",
  "UTILITY":        "bg-text-muted/10 text-text-muted border-text-muted/20",
};

// ── Share Menu ───────────────────────────────────────
function ShareMenu({ url, title, onClose }) {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => { setCopied(false); onClose(); }, 1500);
    } catch {
      window.open(url, "_blank");
    }
  };

  const shareOptions = [
    {
      label: "Twitter / X",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 5.867zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: `https://twitter.com/intent/tweet?text=Check out ${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: "hover:text-sky-400 hover:bg-sky-400/10",
    },
    {
      label: "LinkedIn",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "hover:text-blue-400 hover:bg-blue-400/10",
    },
    {
      label: "WhatsApp",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      href: `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`,
      color: "hover:text-green-400 hover:bg-green-400/10",
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute bottom-10 right-0 z-50 w-52 rounded-xl border border-hairline bg-surface-raised shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-hairline">
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">Share project</span>
        <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
          <X size={12} />
        </button>
      </div>

      {/* Platform options */}
      <div className="p-1.5 space-y-0.5">
        {shareOptions.map((opt) => (
          <a
            key={opt.label}
            href={opt.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-text-muted transition-colors text-sm font-medium ${opt.color}`}
          >
            {opt.icon}
            {opt.label}
          </a>
        ))}

        {/* Divider */}
        <div className="h-px bg-hairline my-1.5" />

        {/* Copy link */}
        <button
          onClick={copyLink}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-text-muted hover:text-violet hover:bg-violet/10 transition-colors text-sm font-medium"
        >
          {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </motion.div>
  );
}

// ── Main Card ────────────────────────────────────────
export default function ProjectCard({ project, index }) {
  const { id, name, tag, year, description, highlights, stack, links, featured } = project;

  const likeKey  = `like_${id}`;
  const countKey = `likes_${id}`;

  const [liked,     setLiked]     = useState(() => localStorage.getItem(likeKey) === "1");
  const [count,     setCount]     = useState(() => parseInt(localStorage.getItem(countKey) || "0", 10));
  const [burst,     setBurst]     = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  // Persist likes
  useEffect(() => {
    localStorage.setItem(likeKey, liked ? "1" : "0");
    localStorage.setItem(countKey, String(count));
  }, [liked, count]);

  const handleLike = () => {
    if (!liked) {
      setCount((c) => c + 1);
      setBurst(true);
      setTimeout(() => setBurst(false), 600);
    } else {
      setCount((c) => Math.max(0, c - 1));
    }
    setLiked((v) => !v);
  };

  // Native share on mobile, dropdown on desktop
  const handleShareClick = async () => {
    const url = links.demo !== "#" ? links.demo : links.code;
    if (navigator.share) {
      try {
        await navigator.share({ title: name, url });
      } catch { /* user cancelled */ }
    } else {
      setShareOpen((v) => !v);
    }
  };

  const gradient = tagColors[tag]      || "from-violet/30 via-violet/10 to-transparent";
  const avatar   = tagAvatarColor[tag] || "bg-violet/15 text-violet border-violet/30";
  const initials = tagInitials[tag]    || name.slice(0, 2).toUpperCase();
  const shareUrl = links.demo !== "#" ? links.demo : links.code;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group flex flex-col rounded-2xl border border-hairline bg-surface overflow-hidden hover:border-violet/50 transition-colors duration-300 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {/* ── Card Header ───────────────────────────────── */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-hairline">
        <div className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center font-mono text-xs font-bold ${avatar}`}>
          {initials}
        </div>
        <div className="min-w-0">
          <h3 className="font-display font-semibold text-base text-text-primary group-hover:text-violet transition-colors leading-tight truncate">
            {name}
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">{tag}</p>
        </div>
        <span className="ml-auto font-mono text-[10px] text-text-muted whitespace-nowrap">{year}</span>
      </div>

      {/* ── Banner ─────────────────────────────────────── */}
      <div className={`relative h-36 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 opacity-[0.06] bg-[repeating-linear-gradient(90deg,white_0px,white_1px,transparent_1px,transparent_28px),repeating-linear-gradient(0deg,white_0px,white_1px,transparent_1px,transparent_28px)]" />
        <div className="relative flex flex-wrap justify-center gap-2 px-6">
          {stack.slice(0, featured ? 8 : 4).map((t) => (
            <span
              key={t}
              className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-void/60 border border-hairline text-text-muted backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Description ─────────────────────────────────── */}
      <div className="px-5 py-4 flex-1">
        <p className="text-text-muted text-sm leading-relaxed mb-3">{description}</p>
        {featured && (
          <ul className="space-y-1.5">
            {highlights.map((h) => (
              <li key={h} className="flex gap-2 text-xs text-text-primary/80 leading-relaxed">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-live shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Footer ──────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-hairline">
        {/* Action buttons */}
        <div className="flex items-center gap-1">
          {links.demo && links.demo !== "#" ? (
            <a
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-violet hover:text-violet/80 transition-colors px-2 py-1 rounded-lg hover:bg-violet/10"
            >
              Live Demo <ArrowUpRight size={12} />
            </a>
          ) : (
            <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted/40 px-2 py-1 cursor-default select-none">
              No Demo
            </span>
          )}
          {links.code && (
            <a
              href={links.code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-text-muted hover:text-violet transition-colors px-2 py-1 rounded-lg hover:bg-violet/10"
            >
              <Code2 size={12} /> Code
            </a>
          )}
        </div>

        {/* Like + Share */}
        <div className="flex items-center gap-2">
          {/* Share */}
          <div className="relative">
            <button
              onClick={handleShareClick}
              title="Share project"
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                shareOpen
                  ? "text-violet bg-violet/15 border border-violet/30"
                  : "text-text-muted hover:text-violet hover:bg-violet/10"
              }`}
            >
              <Share2 size={15} />
            </button>

            <AnimatePresence>
              {shareOpen && (
                <ShareMenu
                  url={shareUrl}
                  title={name}
                  onClose={() => setShareOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Like */}
          <button
            onClick={handleLike}
            title={liked ? "Unlike" : "Like this project"}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-200 ${
              liked
                ? "text-red-400 bg-red-500/10 border border-red-500/30"
                : "text-text-muted hover:text-red-400 hover:bg-red-500/10 border border-transparent"
            }`}
          >
            <motion.span
              animate={burst ? { scale: [1, 1.5, 0.9, 1.1, 1] } : {}}
              transition={{ duration: 0.4 }}
              className="flex items-center"
            >
              <Heart size={14} className={liked ? "fill-red-400" : ""} />
            </motion.span>
            <span className="font-mono text-[11px] min-w-[1ch]">{count}</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
