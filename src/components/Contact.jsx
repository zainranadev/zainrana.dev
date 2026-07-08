import { profile } from "../data";
import DecryptedText from "./DecryptedText";

const contacts = [
  {
    id: "gmail",
    label: "Gmail",
    value: "zainrana.dev@gmail.com",
    hint: "Send me an email",
    href: `mailto:${profile.email}`,
    color: "from-red-500/20 to-orange-500/10",
    borderHover: "hover:border-red-500/50",
    textHover: "group-hover:text-red-400",
    iconBg: "bg-red-500/15",
    iconColor: "text-red-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
    ),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+92 325 1575822",
    hint: "Chat with me directly",
    href: profile.whatsapp,
    color: "from-green-500/20 to-emerald-500/10",
    borderHover: "hover:border-green-500/50",
    textHover: "group-hover:text-green-400",
    iconBg: "bg-green-500/15",
    iconColor: "text-green-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    id: "github",
    label: "GitHub",
    value: "zain-io-dev",
    hint: "Browse my repositories",
    href: profile.github,
    color: "from-violet-500/20 to-purple-500/10",
    borderHover: "hover:border-violet/50",
    textHover: "group-hover:text-violet",
    iconBg: "bg-violet/15",
    iconColor: "text-violet",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "zain-ul-abideen",
    hint: "Connect professionally",
    href: profile.linkedin,
    color: "from-blue-500/20 to-sky-500/10",
    borderHover: "hover:border-blue-500/50",
    textHover: "group-hover:text-blue-400",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-24">
      {/* Header */}
      <p className="font-mono text-xs uppercase tracking-widest text-live mb-3">
        <DecryptedText text="[ Contact ]" animateOn="view" sequential={true} speed={80} />
      </p>
      <h2 className="font-display text-3xl font-semibold mb-2">Get in touch</h2>
      <p className="text-text-muted mb-12 max-w-lg">
        Open to frontend roles and internships. Pick your preferred channel and let's talk.
      </p>

      {/* Contact Cards Grid */}
      <div className="grid sm:grid-cols-2 gap-4 mb-16">
        {contacts.map((c) => (
          <a
            key={c.id}
            href={c.href}
            target={c.id === "gmail" ? undefined : "_blank"}
            rel="noopener noreferrer"
            className={`group relative flex items-center gap-5 rounded-2xl border border-hairline bg-surface p-6 transition-all duration-300 ${c.borderHover} hover:bg-surface-raised overflow-hidden`}
          >
            {/* Background gradient on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${c.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            {/* Icon */}
            <div className={`relative shrink-0 w-12 h-12 rounded-xl ${c.iconBg} flex items-center justify-center ${c.iconColor}`}>
              {c.icon}
            </div>

            {/* Text */}
            <div className="relative min-w-0">
              <p className={`font-mono text-[10px] uppercase tracking-widest text-text-muted mb-0.5 transition-colors ${c.textHover}`}>
                {c.label}
              </p>
              <p className="font-display font-semibold text-text-primary text-sm truncate">
                {c.value}
              </p>
              <p className="font-mono text-[10px] text-text-muted mt-0.5">{c.hint}</p>
            </div>

            {/* Arrow */}
            <svg
              className={`relative ml-auto shrink-0 w-4 h-4 text-text-muted transition-all duration-300 ${c.textHover} group-hover:translate-x-1`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ))}
      </div>

      {/* Footer */}
      <p className="text-center font-mono text-[11px] text-text-muted">
        Built by {profile.name} — React &amp; Framer Motion.
      </p>
    </section>
  );
}
