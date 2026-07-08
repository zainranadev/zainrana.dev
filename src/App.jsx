import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import About from "./components/About";
import Comments from "./components/Comments";
import Contact from "./components/Contact";
import PixelBlast from "./components/PixelBlast";
import CpuTransitionOverlay from "./components/CpuTransitionOverlay";

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
      {/* Dynamic Interactive Volcanic Pixel Background */}
      <div className="fixed inset-0 pointer-events-auto z-[-1] opacity-35">
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#FF4B1F" /* Ember color matching the theme */
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
        <Comments />
        <Contact />
      </main>

      {/* Fullscreen CPU transition overlay */}
      <AnimatePresence>
        {isTransitioning && <CpuTransitionOverlay isVisible={isTransitioning} />}
      </AnimatePresence>
    </div>
  );
}

