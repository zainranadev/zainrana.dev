import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CpuArchitecture } from "./cpu-architecture";

const terminalSteps = [
  { time: 100, text: "[SYSTEM] Booting portfolio cores..." },
  { time: 450, text: "[MEMORY] Allocating cache & memory buffers..." },
  { time: 900, text: "[NETWORK] Fetching selected project repositories..." },
  { time: 1350, text: "[PIPELINE] Compiling components & layouts..." },
  { time: 1750, text: "[SUCCESS] Connection established! Rendering workspace..." },
];

export default function CpuTransitionOverlay({ isVisible }) {
  const [logs, setLogs] = useState([]);
  const [cpuText, setCpuText] = useState("INIT");

  useEffect(() => {
    if (!isVisible) {
      setLogs([]);
      setCpuText("INIT");
      return;
    }

    // Sequentially add console logs
    const timers = terminalSteps.map((step) => {
      return setTimeout(() => {
        setLogs((prev) => [...prev, step.text]);
      }, step.time);
    });

    // Animate CPU text corresponding to stages
    const textTimers = [
      setTimeout(() => setCpuText("LOAD"), 450),
      setTimeout(() => setCpuText("SYNC"), 900),
      setTimeout(() => setCpuText("BOOT"), 1350),
      setTimeout(() => setCpuText("DONE"), 1750),
    ];

    return () => {
      timers.forEach(clearTimeout);
      textTimers.forEach(clearTimeout);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void/95 backdrop-blur-md text-text-primary px-6"
    >
      {/* Dynamic Background Glowing Orb */}
      <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-violet/10 blur-[80px] md:blur-[120px] pointer-events-none -translate-y-10" />

      {/* Main Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
        className="relative max-w-lg w-full flex flex-col items-center"
      >
        {/* Decorative Grid Frame */}
        <div className="absolute inset-0 bg-surface/30 border border-hairline rounded-2xl -m-4 md:-m-8 -z-10 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] bg-[repeating-linear-gradient(90deg,white_0px,white_1px,transparent_1px,transparent_6px)]" />
        </div>

        {/* CPU Architecture SVG */}
        <div className="w-full max-w-[360px] md:max-w-[420px] aspect-[2/1] text-violet mb-8 drop-shadow-[0_0_15px_rgba(143,191,106,0.20)]">
          <CpuArchitecture
            text={cpuText}
            animateText={true}
            animateLines={true}
            animateMarkers={true}
          />
        </div>

        {/* Pseudo Terminal Status Console */}
        <div className="w-full bg-surface-raised/40 border border-hairline rounded-xl p-4 font-mono text-[10px] md:text-xs text-text-muted space-y-1.5 h-32 md:h-36 overflow-hidden flex flex-col justify-end shadow-inner">
          <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-none flex flex-col justify-end">
            {logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={log.includes("[SUCCESS]") ? "text-live font-semibold" : ""}
              >
                {log}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
