// src/components/LoveLettersView.jsx
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { lettersData } from "../config/lettersConfig";

export const LoveLettersView = ({ onComplete }) => {
  const [activeLetter, setActiveLetter] = useState(null);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [openedLetters, setOpenedLetters] = useState(new Set());
  const letterScrollRef = useRef(null);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop - clientHeight < 25) {
      setHasScrolledToBottom(true);
    }
  };

  const handleOpenLetter = (letter) => {
    setActiveLetter(letter);
    setHasScrolledToBottom(false);
    
    setOpenedLetters((prev) => {
      const updated = new Set(prev);
      updated.add(letter.id);
      return updated;
    });
  };

  const allLettersOpened = openedLetters.size === lettersData.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full flex flex-col bg-[#0d0a0f] text-white p-6 sm:p-12 overflow-y-auto pb-36 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-rose-500/20 relative select-none"
    >
      {/* Subtle Ambient Rose Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-rose-900/10 blur-[160px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 shrink-0 relative z-10">
        <span className="text-rose-400 text-[10px] tracking-[0.4em] uppercase font-bold block mb-1">
          The Shared Archive ({openedLetters.size}/{lettersData.length} Read)
        </span>
        <h1 className="font-['Playfair_Display',serif] text-2xl sm:text-4xl font-bold tracking-wide text-white drop-shadow">
          Letters of Love
        </h1>
        <p className="text-zinc-400 text-xs tracking-widest uppercase mt-1">
          Explore the scattered notes on the desk. Read all to unlock your way back...
        </p>
      </div>

      {/* DYNAMIC STAGGERED DESK LAYOUT (NO OVERLAPS, ORGANIC FEEL) */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10 my-4">
        {lettersData.map((letter, idx) => {
          const isOpened = openedLetters.has(letter.id);

          // Give alternating cards a subtle natural rotation tilt for an organic desk feel
          const rotationClass = idx % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]";

          return (
            <motion.div 
              key={letter.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ scale: 1.03, rotate: 0, y: -5, zIndex: 30 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleOpenLetter(letter)}
              className={`
                relative bg-gradient-to-br from-rose-950/40 via-zinc-900/90 to-black 
                border transition-all duration-300 p-6 rounded-3xl 
                shadow-[0_15px_30px_rgba(0,0,0,0.6)] backdrop-blur-md
                cursor-pointer group flex flex-col justify-between ${rotationClass}
                ${isOpened ? "border-rose-500/60 shadow-[0_0_20px_rgba(244,63,94,0.15)]" : "border-rose-500/25 hover:border-rose-500/60"}
              `}
            >
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="text-[10px] font-mono text-rose-300 bg-rose-950/70 px-2.5 py-0.5 rounded-full border border-rose-500/30">
                  #{idx + 1}
                </span>
                <span className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs backdrop-blur-md shadow">
                  {isOpened ? "✓" : "💌"}
                </span>
              </div>

              <div>
                <span className="text-[9px] font-mono text-rose-300 uppercase tracking-widest block mb-1">{letter.date}</span>
                <h3 className="font-['Playfair_Display',serif] text-base font-bold text-white group-hover:text-rose-200 transition-colors pr-10">
                  {letter.title}
                </h3>
                <p className="text-zinc-300/80 text-xs italic line-clamp-3 mt-2 font-light leading-relaxed">
                  "{letter.fullText}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] tracking-widest uppercase text-rose-400 font-bold group-hover:translate-x-1 transition-transform">
                  {isOpened ? "Read Again ➔" : "Open Letter ➔"}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* --- SMOOTH UNFOLDING LETTER MODAL (FIXED ANIMATION GLITCH) --- */}
      <AnimatePresence>
        {activeLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              if (hasScrolledToBottom) setActiveLetter(null);
            }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full max-h-[85vh] bg-[#141017] text-rose-100 p-8 sm:p-12 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-rose-500/30 overflow-hidden cursor-default flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-rose-500/20 shrink-0 relative z-10 bg-[#141017]">
                <div>
                  <span className="font-['Playfair_Display',serif] text-[9px] uppercase tracking-[0.3em] text-rose-400/80 font-bold block">
                    Personal Keepsake
                  </span>
                  <h2 className="font-['Playfair_Display',serif] text-xl font-bold text-white mt-0.5">
                    {activeLetter.title}
                  </h2>
                </div>
                <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-500/30">
                  {activeLetter.date}
                </span>
              </div>

              {/* Scrollable Letter Content */}
              <div 
                ref={letterScrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto pr-3 relative z-10 my-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-rose-500/30"
              >
                <div className="py-2 pb-6">
                  <p 
                    style={{ fontFamily: "'Caveat', cursive" }}
                    className="text-base sm:text-lg font-normal leading-[32px] text-rose-50/90 tracking-wide whitespace-pre-line"
                  >
                    {activeLetter.fullText}
                  </p>
                </div>
              </div>

              {/* Footer with Folding Animation Trigger */}
              <div className="pt-4 border-t border-rose-500/20 flex justify-between items-center shrink-0 relative z-10 bg-[#141017]">
                <span style={{ fontFamily: "'Caveat', cursive" }} className="text-lg text-rose-300">
                  With all my heart, Baal.
                </span>
                
                <button
                  disabled={!hasScrolledToBottom}
                  onClick={() => setActiveLetter(null)}
                  className={`
                    text-[10px] tracking-[0.2em] uppercase font-medium py-2 px-5 rounded-full transition-all duration-300 backdrop-blur-md
                    ${hasScrolledToBottom 
                      ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-200 border border-rose-500/40 cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.2)]" 
                      : "bg-zinc-900/50 text-zinc-600 border border-white/5 cursor-not-allowed opacity-40"}
                  `}
                >
                  {hasScrolledToBottom ? "Fold & Keep ✦" : "Read to Unlock 🔒"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SANCTUM RETURN BUTTON (LOCKED UNTIL ALL LETTERS ARE READ) --- */}
      <div className="w-full flex flex-col items-center gap-3 pt-8 border-t border-rose-500/20 mt-16 pb-6 relative z-10">
        {!allLettersOpened && (
          <span className="text-[10px] uppercase tracking-widest text-rose-400/70 font-mono animate-pulse">
            🔒 Read all {lettersData.length} letters to unlock return ({openedLetters.size}/{lettersData.length})
          </span>
        )}

        <button
          disabled={!allLettersOpened}
          onClick={onComplete} 
          className={`
            w-full max-w-[320px] font-bold py-3.5 px-4 rounded-2xl text-[10px] tracking-widest uppercase transition-all border shadow-md
            ${allLettersOpened 
              ? "bg-rose-950/80 hover:bg-rose-950 text-rose-200 border-rose-500/50 cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(244,63,94,0.5)] hover:-translate-y-0.5" 
              : "bg-zinc-900 text-zinc-600 border-white/5 cursor-not-allowed opacity-40"}
          `}
        >
          {allLettersOpened ? "Return to the Sanctum ➔" : "Sanctum Locked 🔒"}
        </button>
      </div>
    </motion.div>
  );
};