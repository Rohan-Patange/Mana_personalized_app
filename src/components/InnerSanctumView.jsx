// src/components/InnerSanctumView.jsx
import React from "react";
import { motion } from "framer-motion";

export const InnerSanctumView = ({ unlockProgress, onNavigate }) => {
  // Letters (Index 4) unlock entry to Sanctum
  // Gallery (Index 5) unlocks the Memory Gallery
  // Finale (Index 6) unlocks The Private Ceremony
  const isGalleryUnlocked = unlockProgress >= 5;
  const isFinaleUnlocked = unlockProgress >= 6;

  const SanctumCard = ({ title, subtitle, icon, isUnlocked, onClick, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      onClick={isUnlocked ? onClick : undefined}
      className={`
        relative w-full p-6 sm:p-8 rounded-3xl border flex items-center justify-between group overflow-hidden transition-all duration-500
        ${isUnlocked 
          ? "bg-gradient-to-r from-zinc-900 via-black to-zinc-950 border-white/10 hover:border-rose-500/50 cursor-pointer shadow-2xl" 
          : "bg-black/40 border-white/5 opacity-50 grayscale cursor-not-allowed"}
      `}
    >
      {isUnlocked && (
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      
      <div className="relative z-10 flex items-center gap-6">
        <div className={`
          w-14 h-14 rounded-full flex items-center justify-center text-2xl border backdrop-blur-md shadow-lg transition-transform duration-500
          ${isUnlocked ? "bg-white/5 border-white/10 group-hover:scale-110 group-hover:border-rose-500/30" : "bg-black/50 border-white/5"}
        `}>
          {icon}
        </div>
        <div>
          <h3 className={`font-['Playfair_Display',serif] text-2xl font-bold tracking-wide mb-1 ${isUnlocked ? "text-white" : "text-zinc-600"}`}>
            {title}
          </h3>
          <p className="text-zinc-400 text-sm font-light tracking-wider">
            {isUnlocked ? subtitle : "Locked until previous chapter is completed."}
          </p>
        </div>
      </div>

      <div className="relative z-10">
        {isUnlocked ? (
          <span className="text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0 inline-block">
            Enter ➔
          </span>
        ) : (
          <span className="text-zinc-600 text-xl">🔒</span>
        )}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 1 }}
      className="absolute inset-0 z-40 w-full h-full bg-[#050505] flex flex-col overflow-y-auto px-4 sm:px-8 py-12 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-rose-500/20"
    >
      {/* Subtle Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-rose-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto w-full relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <span className="text-rose-400 text-[10px] tracking-[0.4em] uppercase font-bold block mb-4">
            The Inner Sanctum
          </span>
          <h1 className="font-['Playfair_Display',serif] text-4xl sm:text-5xl font-bold text-white tracking-wider mb-4 drop-shadow-[0_0_20px_rgba(244,63,94,0.3)]">
            Beyond the Map
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base font-light italic tracking-widest max-w-lg mx-auto leading-relaxed">
            "The roads brought us to beautiful places, but this is where the real journey lives."
          </p>
        </motion.div>

        {/* The Three Final Pillars */}
        <div className="w-full flex flex-col gap-5">
          
          <SanctumCard 
            title="Letters of Love" 
            subtitle="The words we shared along the way."
            icon="💌" 
            isUnlocked={true} 
            onClick={() => onNavigate("letters")}
            delay={0.4}
          />

          <SanctumCard 
            title="A Memory Gallery" 
            subtitle="Our visual roadmap of milestones."
            icon="🎞️" 
            isUnlocked={isGalleryUnlocked} 
            onClick={() => onNavigate("gallery")}
            delay={0.6}
          />

          <SanctumCard 
            title="The Private Ceremony" 
            subtitle="The day everything changed forever."
            icon="💍" 
            isUnlocked={isFinaleUnlocked} 
            onClick={() => onNavigate("finale")}
            delay={0.8}
          />

        </div>

        {/* Back to Map Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          onClick={() => onNavigate("hub")}
          className="mt-12 text-zinc-500 hover:text-rose-300 text-xs tracking-[0.2em] uppercase font-medium transition-colors border-b border-transparent hover:border-rose-300 pb-1"
        >
          ← Return to the Travel Map
        </motion.button>

      </div>
    </motion.div>
  );
};