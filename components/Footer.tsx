"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#06141B] w-full pt-16 pb-8 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        
        {/* Main Footer Bar */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between text-[10px] md:text-xs text-gray-500 tracking-wider">
          
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="font-bold text-gray-300">KH</span>
            <span>KALAHARI HERTZ — © 2026 — PPADB REGISTERED</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span>PLOT 74212, GABORONE NORTH</span>
            <span>+267 74 076 795</span>
            <span className="hidden md:block">WWW.KALAHARIHERTZ.BW</span>
          </div>
        </div>

        {/* Credit Line */}
        <div className="w-full text-center text-gray-600 text-xs mt-4">
          <p>
            Website by{" "}
            <a 
              href="https://xclassicstudio.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-blue-400 transition-colors underline underline-offset-4"
            >
              xclassicstudio
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}