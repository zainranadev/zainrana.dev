import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const MAX_CHIPS = 4;

function GithubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function getInitials(name = "") {
  return name
    .split(/[\s\-_]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function ProjectCard({ project }) {
  const { name, description, stack = [], tag, image } = project;

  // Field names vary between portfolios, so accept the common ones (including project.links).
  const rawGithub =
    project.github ??
    project.repo ??
    project.githubUrl ??
    project.code ??
    project.links?.code ??
    project.links?.github;
  const rawLive =
    project.live ??
    project.demo ??
    project.link ??
    project.url ??
    project.links?.demo ??
    project.links?.live;

  const github = rawGithub && rawGithub !== "#" ? rawGithub : null;
  const live = rawLive && rawLive !== "#" ? rawLive : null;

  const visibleStack = stack.slice(0, MAX_CHIPS);
  const hiddenStack = stack.slice(MAX_CHIPS);

  // Pointer position drives the spotlight and the edge glow.
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);

  const edge = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, currentColor, transparent 70%)`;
  const wash = useMotionTemplate`radial-gradient(340px circle at ${mx}px ${my}px, color-mix(in srgb, currentColor 12%, transparent), transparent 70%)`;

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <article
      onMouseMove={handleMove}
      className="group relative h-full rounded-2xl bg-hairline p-px"
    >
      {/* Edge glow that follows the pointer */}
      <motion.div
        aria-hidden
        style={{ background: edge }}
        className="pointer-events-none absolute inset-0 rounded-2xl text-violet opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[15px] bg-surface">
        {/* Soft spotlight over the whole card surface */}
        <motion.div
          aria-hidden
          style={{ background: wash }}
          className="pointer-events-none absolute inset-0 z-10 text-violet opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Cover */}
        <div className="relative h-36 overflow-hidden border-b border-hairline bg-void">
          {image ? (
            <img
              src={image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
            />
          ) : (
            <>
              <div
                aria-hidden
                className="absolute inset-0 text-text-muted opacity-20"
                style={{
                  backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />
              <span
                aria-hidden
                className="absolute -bottom-3 left-4 select-none font-display text-8xl font-semibold leading-none text-text-primary opacity-[0.07] transition-all duration-500 group-hover:text-violet group-hover:opacity-20"
              >
                {getInitials(name)}
              </span>
            </>
          )}

          {tag && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-hairline bg-void/80 px-2.5 py-1 font-mono text-[11px] text-text-muted backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-violet" />
              {tag}
            </span>
          )}

          {project.featured && (
            <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-violet/40 bg-violet/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-violet backdrop-blur">
              ★ Featured
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="font-display text-xl font-semibold leading-snug text-text-primary">
            {name}
          </h3>

          <p className="line-clamp-3 text-sm leading-relaxed text-text-muted">
            {description}
          </p>

          {stack.length > 0 && (
            <ul className="mt-auto flex flex-wrap gap-1.5 pt-2" aria-label="Tech stack">
              {visibleStack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-hairline bg-surface-raised px-2 py-0.5 font-mono text-[11px] text-text-muted"
                >
                  {tech}
                </li>
              ))}
              {hiddenStack.length > 0 && (
                <li
                  title={hiddenStack.join(", ")}
                  className="rounded-md border border-dashed border-hairline px-2 py-0.5 font-mono text-[11px] text-text-muted"
                >
                  +{hiddenStack.length}
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Links */}
        {(github || live) && (
          <div className="relative flex items-center gap-4 border-t border-hairline px-5 py-3 text-sm">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} source code on GitHub`}
                className="inline-flex items-center gap-1.5 rounded text-text-muted transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
              >
                <GithubIcon className="h-4 w-4" />
                Source
              </a>
            )}
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${name} live`}
                className="ml-auto inline-flex items-center gap-1 rounded font-medium text-violet transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
              >
                View live
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
