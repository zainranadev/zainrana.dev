import { useEffect } from "react";
import { profile } from "../../data";

export default function ResumeModal({ onClose }) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Resume preview"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-void/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full max-w-4xl h-[90vh] flex flex-col rounded-2xl border border-hairline bg-surface shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-hairline shrink-0">
          <div className="flex items-center gap-3">
            {/* PDF icon */}
            <div className="w-8 h-8 rounded-lg bg-violet/15 border border-violet/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="font-display font-semibold text-sm text-text-primary">Resume</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                {profile.name}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href={profile.resumeUrl}
              download
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest bg-violet text-void px-4 py-2 rounded-full hover:bg-violet/90 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-hairline text-text-muted hover:border-violet hover:text-violet transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Preview */}
        <div className="flex-1 bg-void/50 relative">
          <iframe
            src={`${profile.resumeUrl}#toolbar=0&navpanes=0`}
            className="w-full h-full"
            title="Resume PDF preview"
          />
          {/* Subtle gradient at the bottom */}
          <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-surface/60 to-transparent pointer-events-none" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-hairline shrink-0">
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
            Press <kbd className="px-1.5 py-0.5 rounded bg-surface-raised border border-hairline text-text-muted text-[9px]">ESC</kbd> to close
          </p>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-widest text-text-muted hover:text-violet transition-colors flex items-center gap-1"
          >
            Open in new tab
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
