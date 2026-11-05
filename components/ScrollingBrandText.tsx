"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

export default function ScrollingBrandText() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking values
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Fast, snappy spring for a liquid/water feel
  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Sharp "water droplet" gradient (Bright white core, blue edge, sharp drop-off)
  const backgroundImage = useMotionTemplate`
    radial-gradient(circle 180px at ${smoothX}px ${smoothY}px, 
      #ffffff 0%, 
      #93c5fd 15%, 
      #2563eb 40%, 
      #0A192F 70%, 
      transparent 75%
    )
  `;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  const text = "KALAHARI HERTZ ";

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden relative cursor-crosshair py-12 bg-[#06141B] border-t border-white/5"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      >
        {[0, 1].map((i) => (
          <div key={i} className="relative flex pr-8">
            {/* Base Text (Faint Watermark) */}
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none select-none text-white/5">
              {text}
            </h2>
            
            {/* Sharp Glowing Overlay */}
            <motion.h2
              className="absolute inset-0 text-6xl md:text-8xl font-black tracking-tighter leading-none select-none text-transparent bg-clip-text pointer-events-none drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]"
              style={{ backgroundImage }}
            >
              {text}
            </motion.h2>
          </div>
        ))}
      </motion.div>
    </div>
  );
}