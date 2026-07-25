import React, { useState } from "react";
import { motion } from "framer-motion";
import { LETTER_CONFIG } from "../config/letterConfig";

export const EnvelopeStage = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [burstParticles, setBurstParticles] = useState([]);

  const handleMouseMove = (e) => {
    if (isOpening) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -14, y: x * 14 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);

    const newParticles = Array.from({ length: 10 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 160,
      emoji: ["💖", "✨", "💕", "🌸"][Math.floor(Math.random() * 4)],
    }));
    setBurstParticles(newParticles);

    setTimeout(() => {
      onOpen();
      setIsOpening(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative z-10 flex flex-col items-center justify-center text-center max-w-sm w-full"
    >
      <div className="w-full bg-[#161217]/90 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] mb-6 flex flex-col items-center">
        <div className="px-3.5 py-1 bg-rose-500/20 border border-rose-500/30 rounded-full mb-2 flex items-center gap-1.5">
          <span className="text-[11px] font-medium tracking-wide text-rose-200">
            Special Delivery 📦
          </span>
        </div>

        <div className="font-['Dancing_Script',cursive] text-2xl sm:text-3xl text-rose-300 font-bold my-1 tracking-wide">
          To: Dearest {LETTER_CONFIG.landingRecipientName} 💌
        </div>

        <h2 className="text-base sm:text-lg font-medium text-rose-100 tracking-tight mt-0.5">
          "A secret letter arrived for you..."
        </h2>
      </div>

      <motion.div
        style={{ perspective: 1000 }}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleOpenEnvelope}
        className="cursor-pointer relative w-full bg-[#18131a] border border-rose-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(225,29,72,0.15)] flex items-center justify-center my-2 group overflow-hidden"
      >
        <div className="absolute top-3 right-3 border border-dashed border-rose-300/30 rounded px-2 py-0.5 transform rotate-6 opacity-70 pointer-events-none">
          <span className="text-[8px] font-mono tracking-widest text-rose-200 uppercase">
            AIR MAIL • CONFIDENTIAL
          </span>
        </div>

        <div className="w-64 h-40 relative flex items-center justify-center">
          <svg viewBox="0 0 180 120" className="w-full h-full overflow-visible">
            <rect x="10" y="20" width="160" height="90" rx="10" fill="#e8b4c8" />

            <motion.g
              animate={isOpening ? { y: -38 } : { y: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
            >
              <rect x="20" y="25" width="140" height="75" rx="6" fill="#fffdf6" stroke="#ebd2c0" strokeWidth="1.5" />
              <line x1="32" y1="40" x2="148" y2="40" stroke="#f0d5e1" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="32" y1="52" x2="128" y2="52" stroke="#f0d5e1" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="32" y1="64" x2="140" y2="64" stroke="#f0d5e1" strokeWidth="2" strokeDasharray="4 2" />
            </motion.g>

            <path
              d="M 10 20 L 90 70 L 170 20 L 170 100 C 170 105 165 110 160 110 L 20 110 C 15 110 10 105 10 100 Z"
              fill="#fbebf2"
              stroke="#e8a8c2"
              strokeWidth="2.5"
            />

            <motion.g
              style={{ transformOrigin: "90px 20px", transformBox: "fill-box" }}
              animate={isOpening ? { scaleY: -1, y: -2 } : { scaleY: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <path
                d="M 10 20 L 90 70 L 170 20 Z"
                fill="#f7dbe7"
                stroke="#e8a8c2"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </motion.g>

            <motion.g
              animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.circle
                cx="90"
                cy="70"
                r="18"
                fill="#be4b68"
                animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0.6, 0.2] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                style={{ transformOrigin: "90px 70px" }}
              />
              <circle cx="90" cy="70" r="14" fill="#be4b68" stroke="#ffffff" strokeWidth="2.5" className="shadow-md" />
              <path
                d="M 90 75 C 84 70.5, 81 67, 85 63 C 88.5 60.5, 90 63, 90 64.5 C 90 63, 91.5 60.5, 95 63 C 99 67, 96 70.5, 90 75 Z"
                fill="#ffffff"
              />
            </motion.g>
          </svg>

          {burstParticles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 0, x: p.x, y: p.y, scale: 1.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute text-xl pointer-events-none"
            >
              {p.emoji}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <p className="mt-5 text-zinc-400 text-xs sm:text-sm tracking-wide font-normal">
        Tap the glowing wax seal to open 💌
      </p>
    </motion.div>
  );
};