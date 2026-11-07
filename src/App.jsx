import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Nav from "./components/layout/Nav";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import PixelBlast from "./components/shared/PixelBlast";
import CpuTransitionOverlay from "./components/shared/CpuTransitionOverlay";

export default function App() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const triggerWorkTransition = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      // Wait for exit animation to complete or start scrolling
      const el = document.querySelector("#work");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 2200); // 2.2 seconds total duration
  };

  return (
    <div className="min-h-screen font-body relative">
      <div className="fixed inset-0 pointer-events-auto z-[-1] opacity-35">
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#8FBF6A" /* Forest green matching the Deep Forest theme */
          patternScale={2}
          patternDensity={0.8}
          enableRipples={true}
          rippleSpeed={0.3}
          rippleThickness={0.12}
          rippleIntensityScale={1.2}
          speed={0.3}
          transparent={true}
          edgeFade={0.2}
        />
      </div>

      <Nav onViewWork={triggerWorkTransition} />
      <main className="relative z-10">
        <Hero onViewWork={triggerWorkTransition} />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>

      <AnimatePresence>
        {isTransitioning && <CpuTransitionOverlay isVisible={isTransitioning} />}
      </AnimatePresence>
    </div>
  );
}

