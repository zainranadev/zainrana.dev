import { motion } from "framer-motion";
import ProfileCard from "../shared/ProfileCard";

const SVG_GRID = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjYiLz48Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iMSIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMyIvPjxjaXJjbGUgY3g9IjYwIiBjeT0iMCIgcj0iMSIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMyIvPjxjaXJjbGUgY3g9IjAiIGN5PSI2MCIgcj0iMSIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMyIvPjxjaXJjbGUgY3g9IjYwIiBjeT0iNjAiIHI9IjEiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=";

const SVG_GRAIN = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDEgICAwIDAgMCAwIDEgICAwIDAgMCAwIDEgIDAgMCAwIDAuMDggMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWx0ZXI9InVybCgjbm9pc2UpIi8+PC9zdmc+";

export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-live mb-8">
        [ About ]
      </p>
      
      <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display text-2xl sm:text-3xl leading-snug text-balance">
            I’m Zain Ul Abideen, a Full stack developer who builds responsive, user-focused web apps with React, Node.js, Express.js and MongoDB. I care about clean, scalable code and thoughtful UI/UX, and I’m always exploring new tech, including AI-powered solutions, to solve real-world problems.
          </p>
          <p className="mt-6 text-text-muted leading-relaxed">
            I care about interfaces that stay clear under real data — live scores updating over WebSockets, AI responses streaming in, forms that hold up when the data gets messy. Outside of coursework and internship work, I like pushing on visual details: motion, spacing, and dark UI that still feels warm instead of flat.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center"
        >
          <ProfileCard
            name="Zain Ul Abideen"
            title="MERN Stack Developer"
            handle="zain_io_dev"
            status="Available for Work"
            contactText="Contact Me"
            avatarUrl="/Avatar.jpeg"
            iconUrl={SVG_GRID}
            grainUrl={SVG_GRAIN}
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            behindGlowEnabled={true}
            behindGlowColor="rgba(143, 191, 106, 0.30)"
            innerGradient="linear-gradient(145deg, rgba(22, 33, 26, 0.95) 0%, rgba(143, 191, 106, 0.08) 100%)"
            onContactClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}

