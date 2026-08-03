import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../../data";
import ProjectCard from "../shared/ProjectCard";
import { Search, SlidersHorizontal } from "lucide-react";
import DecryptedText from "../shared/DecryptedText";

export default function Projects() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract all unique tags dynamically
  const tags = useMemo(() => {
    const allTags = projects.map((p) => p.tag);
    return ["All", ...new Set(allTags)];
  }, []);

  // Filter projects based on search query and selected tag
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesTag = selectedTag === "All" || project.tag === selectedTag;
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.stack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTag && matchesSearch;
    });
  }, [selectedTag, searchQuery]);

  return (
    <section id="work" className="max-w-6xl mx-auto px-6 py-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-live mb-3">
            <DecryptedText text="[ Work ]" animateOn="view" sequential={true} speed={80} />
          </p>
          <h2 className="font-display text-4xl font-semibold mb-2">Projects</h2>
          <p className="text-text-muted max-w-lg">
            A curated list of my work, including MERN stack applications, Python automation tools, and utility software.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-violet transition-colors" />
          <input
            type="text"
            placeholder="Search by tech stack or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-hairline bg-surface text-sm text-text-primary placeholder:text-text-muted/60 focus:border-violet focus:outline-none transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-text-muted hover:text-text-primary px-1.5 py-0.5 rounded bg-surface-raised border border-hairline"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-hairline">
        <div className="flex items-center gap-2 text-text-muted mr-3 font-mono text-xs uppercase tracking-wider">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filter:
        </div>
        {tags.map((tag) => {
          const isActive = selectedTag === tag;
          const count = tag === "All"
            ? projects.length
            : projects.filter((p) => p.tag === tag).length;

          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`relative px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? "bg-violet text-void font-semibold"
                  : "bg-surface-raised border border-hairline text-text-muted hover:text-text-primary hover:border-violet/40"
              }`}
            >
              <span>{tag === "All" ? "All Work" : tag}</span>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-void/10 text-void" : "bg-void text-text-muted border border-hairline"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid with AnimatePresence layout animations */}
      <motion.div layout className="grid md:grid-cols-2 gap-6 min-h-[400px] items-start">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 180, damping: 20 }}
              className="h-full"
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty state if nothing matches */}
        {filteredProjects.length === 0 && (
          <div className="md:col-span-2 flex flex-col items-center justify-center py-20 text-center border border-dashed border-hairline rounded-2xl bg-surface/50">
            <div className="w-12 h-12 rounded-full bg-surface-raised border border-hairline flex items-center justify-center text-text-muted mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-display font-semibold text-lg text-text-primary mb-1">No projects found</h3>
            <p className="text-text-muted text-sm max-w-xs">
              No matches for "{searchQuery}" {selectedTag !== "All" && `in category "${selectedTag}"`}. Try resetting filters.
            </p>
            <button
              onClick={() => {
                setSelectedTag("All");
                setSearchQuery("");
              }}
              className="mt-4 font-mono text-xs uppercase tracking-widest bg-violet text-void px-4 py-2 rounded-full hover:bg-violet/90 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}
