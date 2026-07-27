// src/components/MemoryGalleryView.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { memoriesData } from "../config/memoriesConfig";

export const MemoryGalleryView = ({ onComplete }) => {
  const [activeMemory, setActiveMemory] = useState(null);
  const [viewedMemories, setViewedMemories] = useState(new Set());

  const handleOpenMemory = (memory) => {
    setActiveMemory(memory);
    setViewedMemories((prev) => {
      const updated = new Set(prev);
      updated.add(memory.id);
      return updated;
    });
  };

  // Require viewing all memories before unlocking return, or adjust as desired
  const allMemoriesViewed = viewedMemories.size >= memoriesData.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full flex flex-col bg-[#0d0a0f] text-white p-6 sm:p-10 overflow-y-auto pb-36 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-rose-500/20 relative select-none"
    >
      {/* Ambient Rose Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-rose-900/10 blur-[160px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 shrink-0 relative z-10">
        <span className="text-rose-400 text-[10px] tracking-[0.4em] uppercase font-bold block mb-1">
          A Visual Prelude ({viewedMemories.size}/{memoriesData.length} Explored)
        </span>
        <h1 className="font-['Playfair_Display',serif] text-2xl sm:text-4xl font-bold tracking-wide text-white drop-shadow">
          Memory Gallery
        </h1>
        <p className="text-zinc-400 text-xs tracking-widest uppercase mt-1">
          Explore the Polaroids scattered across the desk...
        </p>
      </div>

      {/* POLAROID DESK CANVAS */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 relative z-10 my-6 px-4">
        {memoriesData.map((memory, idx) => {
          const isViewed = viewedMemories.has(memory.id);
          const rotations = ["rotate-[-2deg]", "rotate-[1.5deg]", "rotate-[-1deg]", "rotate-[2deg]", "rotate-[-1.5deg]", "rotate-[1deg]"];
          const rotClass = rotations[idx % rotations.length];

          return (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (idx % 6) * 0.05 }}
              whileHover={{ scale: 1.04, rotate: 0, y: -8, zIndex: 30 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleOpenMemory(memory)}
              className={`
                relative bg-[#141017] p-4 pb-5 rounded-2xl 
                border border-rose-500/20 hover:border-rose-500/60
                shadow-[0_20px_40px_rgba(0,0,0,0.7)] backdrop-blur-md
                cursor-pointer transition-all duration-300 group flex flex-col ${rotClass}
                ${isViewed ? "border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.15)]" : ""}
              `}
            >
              {/* Pin / Tape Effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-rose-500/20 backdrop-blur-sm rounded border border-rose-500/30 flex items-center justify-center text-[10px] shadow-sm">
                📌
              </div>

              {/* Photo Frame */}
              <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden bg-zinc-900 relative">
                <img 
                  src={memory.image} 
                  alt="Memory keepsake"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-10 transition-opacity" />
                
                <div className="absolute top-3 right-3">
                  <span className="w-6 h-6 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-[10px] text-white shadow">
                    {isViewed ? "✓" : "📷"}
                  </span>
                </div>
              </div>

              {/* Polaroid Footer */}
              <div className="mt-3 px-1 flex items-center justify-between text-[10px] text-zinc-400 uppercase tracking-widest">
                <span style={{ fontFamily: "'Caveat', cursive" }} className="text-rose-300 text-sm tracking-wide lowercase">
                  tap to view...
                </span>
                <span className="text-rose-400 font-bold group-hover:translate-x-1 transition-transform">
                  Zoom ➔
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* --- CINEMATIC LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveMemory(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#141017] text-rose-100 p-4 sm:p-6 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-rose-500/30 overflow-hidden cursor-default flex flex-col max-h-[90vh]"
            >
              {/* Large Cinematic Image Viewer */}
              <div className="w-full h-[65vh] sm:h-[70vh] rounded-2xl overflow-hidden bg-black relative shrink-0 shadow-lg border border-white/10 flex items-center justify-center">
                <img 
                  src={activeMemory.image} 
                  alt="Expanded memory keepsake" 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Footer Close Button */}
              <div className="pt-4 mt-2 border-t border-rose-500/20 flex justify-between items-center shrink-0">
                <span style={{ fontFamily: "'Caveat', cursive" }} className="text-lg text-rose-300">
                  Forever us, Baal. 🤍
                </span>
                
                <button
                  onClick={() => setActiveMemory(null)}
                  className="text-[10px] tracking-[0.2em] uppercase font-medium py-2 px-6 rounded-full bg-rose-500/15 hover:bg-rose-500/25 text-rose-200 border border-rose-500/40 cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.2)] transition-all"
                >
                  Close Photo ✦
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SANCTUM RETURN BUTTON --- */}
      <div className="w-full flex flex-col items-center gap-3 pt-8 border-t border-rose-500/20 mt-16 pb-6 relative z-10">
        {!allMemoriesViewed && (
          <span className="text-[10px] uppercase tracking-widest text-rose-400/70 font-mono animate-pulse">
            🔒 Explore all memories to unlock return ({viewedMemories.size}/{memoriesData.length})
          </span>
        )}

        <button
          disabled={!allMemoriesViewed}
          onClick={onComplete} 
          className={`
            w-full max-w-[320px] font-bold py-3.5 px-4 rounded-2xl text-[10px] tracking-widest uppercase transition-all border shadow-md
            ${allMemoriesViewed 
              ? "bg-rose-950/80 hover:bg-rose-950 text-rose-200 border-rose-500/50 cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)] hover:-translate-y-0.5" 
              : "bg-zinc-900 text-zinc-600 border-white/5 cursor-not-allowed opacity-40"}
          `}
        >
          {allMemoriesViewed ? "Return to the Sanctum ➔" : "Gallery Locked 🔒"}
        </button>
      </div>
    </motion.div>
  );
};