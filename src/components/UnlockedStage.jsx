// src/components/UnlockedStage.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import your isolated route components
import { WhereItBeganView } from "./WhereItBeganView";
import { PlaceholderChapter } from "./PlaceholderChapter";

// Import your imagery
import atmosphericRoad from "../assets/atmospheric-road.jpg";

export const UnlockedStage = ({ onReset }) => {
  const [activeView, setActiveView] = useState("hub");
  const [unlockProgress, setUnlockProgress] = useState(0);
  const [isImageExpanded, setIsImageExpanded] = useState(false); // Lightbox state

  const handleCompleteChapter = (completedIndex) => {
    setActiveView("hub");
    if (unlockProgress <= completedIndex) {
      setUnlockProgress(completedIndex + 1);
    }
  };

  // Reusable Bento Card Component
  const BentoCard = ({ title, desc, icon, colSpan, chapterIndex, viewId, bgGradient, borderColor }) => {
    const isUnlocked = unlockProgress >= chapterIndex;
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: chapterIndex * 0.08 }}
        whileHover={isUnlocked ? { scale: 1.02, y: -2 } : {}}
        whileTap={isUnlocked ? { scale: 0.98 } : {}}
        onClick={() => {
          if (isUnlocked) setActiveView(viewId);
        }}
        className={`
          ${colSpan} relative rounded-3xl border transition-all p-5 flex flex-col justify-end overflow-hidden group shadow-xl backdrop-blur-md
          ${isUnlocked 
            ? `cursor-pointer ${bgGradient} ${borderColor} shadow-[0_10px_25px_rgba(0,0,0,0.4)]` 
            : "cursor-not-allowed border-white/5 bg-white/[0.01] opacity-50 grayscale"
          }
        `}
        style={{ minHeight: "150px" }}
      >
        {isUnlocked && (
          <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        )}

        <div className="absolute top-4 right-4 z-10">
          {isUnlocked ? (
            <span className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-base backdrop-blur-md shadow group-hover:scale-110 transition-transform">
              {icon}
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[9px] text-zinc-400 tracking-wider uppercase backdrop-blur-md flex items-center gap-1">
              <span>🔒</span> Locked
            </span>
          )}
        </div>

        {isUnlocked && unlockProgress === chapterIndex && (
           <div className="absolute top-5 left-5 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,1)] animate-ping" />
             <span className="text-[9px] uppercase tracking-widest text-rose-300 font-bold">Ready to Explore</span>
           </div>
        )}

        <div className="relative z-10 mt-4">
          <h4 className={`font-['Playfair_Display',serif] font-bold mb-1 text-lg ${isUnlocked ? "text-white" : "text-zinc-500"}`}>
            {title}
          </h4>
          <p className="text-zinc-300/80 font-normal text-xs line-clamp-2 leading-relaxed">
            {isUnlocked ? desc : "Complete the preceding chapter to unlock this memory."}
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="absolute inset-0 z-25 w-full h-full bg-[#0d0a0f] overflow-hidden">
      <AnimatePresence mode="wait">
        
        {/* ROUTE: THE HUB */}
        {activeView === "hub" && (
          <motion.div
            key="hub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full flex flex-col overflow-y-auto px-4 sm:px-8 pt-6 pb-28 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-rose-500/20"
          >
            
            {/* --- PAGE BANNER / HEADER --- */}
            <div className="text-center max-w-3xl mx-auto mb-6 shrink-0">
              <span className="text-rose-400 text-[10px] tracking-[0.4em] uppercase font-bold block mb-1">
                Milestone Memory Vault
              </span>
              <h1 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-white tracking-wide">
                Our Journey: 10 Months & Counting
              </h1>
            </div>

            {/* --- TWO-PANE DESKTOP / STACKED MOBILE LAYOUT --- */}
            <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT PANE: Image (Top) & Journey Note (Bottom) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Clickable Map Image Card with Expand Hint */}
                <div 
                  onClick={() => setIsImageExpanded(true)}
                  className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black/40 backdrop-blur-md group cursor-pointer h-64 sm:h-72 w-full"
                >
                  <img 
                    src={atmosphericRoad} 
                    alt="Our Journey Map" 
                    className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Badge */}
                  <span className="absolute bottom-3 left-3 text-[10px] tracking-widest text-rose-300 uppercase font-bold bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-rose-500/30 shadow">
                    🗺️ The Map of Our Hearts
                  </span>

                  {/* Click to Expand Hint Overlay */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-[9px] text-white tracking-wider uppercase flex items-center gap-1 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all">
                    <span>🔍</span> Click to Expand
                  </div>
                </div>

                {/* Journey Note Card */}
                <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl backdrop-blur-md shadow-xl flex flex-col justify-center">
                  <span className="text-rose-400 text-[10px] tracking-[0.3em] uppercase font-bold mb-2 block">
                    The Love Log
                  </span>
                  <h3 className="font-['Playfair_Display',serif] text-xl font-bold text-white mb-3 leading-snug">
                    Thousands of Kilometers & Endless Memories
                  </h3>
                  <p className="text-zinc-300/90 text-xs sm:text-sm leading-relaxed italic font-['Playfair_Display',serif]">
                    "Ten months, thousands of kilometers, and an endless list of moments later, it doesn't actually matter where we're going, as long as I'm in the passenger seat next to you."
                  </p>
                </div>

              </div>

              {/* RIGHT PANE: The Bento Chapter Grids */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="mb-1 hidden lg:block">
                  <h3 className="text-sm font-semibold text-zinc-400 tracking-wider uppercase">Unlocked Chapters</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <BentoCard 
                    title="Where It All Began"
                    desc="Tamhini Ghat, the spark, the confession, and that first Lonavla drive."
                    icon="🗺️"
                    colSpan="sm:col-span-2 col-span-1"
                    chapterIndex={0}
                    viewId="began"
                    bgGradient="bg-gradient-to-br from-rose-950/50 via-zinc-900/80 to-black"
                    borderColor="border-rose-500/30 hover:border-rose-500/60"
                  />

                  <BentoCard 
                    title="Midnight Therapy"
                    desc="Late night drives, endless talks, and finding peace on empty roads."
                    icon="🚗"
                    colSpan="sm:col-span-2 col-span-1"
                    chapterIndex={1}
                    viewId="drives"
                    bgGradient="bg-gradient-to-br from-indigo-950/50 via-zinc-900/80 to-black"
                    borderColor="border-indigo-500/30 hover:border-indigo-500/60"
                  />

                  <BentoCard 
                    title="Divine Stops"
                    desc="Seeking blessings at beautiful temples along our way."
                    icon="🛕"
                    colSpan="col-span-1"
                    chapterIndex={2}
                    viewId="temples"
                    bgGradient="bg-gradient-to-br from-orange-950/40 via-zinc-900/80 to-black"
                    borderColor="border-orange-500/30 hover:border-orange-500/60"
                  />

                  <BentoCard 
                    title="Cafe Dates"
                    desc="Cozy corners, warm coffee, and sweet conversations."
                    icon="☕"
                    colSpan="col-span-1"
                    chapterIndex={3}
                    viewId="cafes"
                    bgGradient="bg-gradient-to-br from-amber-950/40 via-zinc-900/80 to-black"
                    borderColor="border-amber-500/30 hover:border-amber-500/60"
                  />

                  <BentoCard 
                    title="Our Escapes"
                    desc="Weekend trips, new horizons, and making memories far from home."
                    icon="✈️"
                    colSpan="sm:col-span-2 col-span-1"
                    chapterIndex={4}
                    viewId="escapes"
                    bgGradient="bg-gradient-to-tl from-teal-950/40 via-zinc-900/80 to-black"
                    borderColor="border-teal-500/30 hover:border-teal-500/60"
                  />
                </div>

                {/* Global Lock Vault Button */}
                <div className="w-full flex justify-center pt-6">
                  <button
                    onClick={onReset}
                    className="w-full max-w-[300px] bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-rose-200 font-medium py-3 px-4 rounded-2xl text-[10px] tracking-widest uppercase transition-all cursor-pointer border border-white/10 shadow-lg"
                  >
                    Lock the Vault 🔒
                  </button>
                </div>

              </div>

            </div>

          </motion.div>
        )}

        {/* --- LIGHTBOX MODAL FOR EXPANDED IMAGE --- */}
        <AnimatePresence>
          {isImageExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsImageExpanded(false)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-3xl border border-white/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={atmosphericRoad} 
                  alt="Expanded Map" 
                  className="w-full h-full object-contain max-h-[85vh]"
                />
                <button 
                  onClick={() => setIsImageExpanded(false)}
                  className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white text-xs px-4 py-2 rounded-full border border-white/20 backdrop-blur-md transition-all cursor-pointer uppercase tracking-wider"
                >
                  Close ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ROUTE: WHERE IT ALL BEGAN */}
        {activeView === "began" && (
          <WhereItBeganView key="began" onComplete={() => handleCompleteChapter(0)} />
        )}

        {/* ROUTES: PLACEHOLDERS */}
        {activeView === "drives" && <PlaceholderChapter key="drives" title="Midnight Therapy" onBack={() => handleCompleteChapter(1)} />}
        {activeView === "temples" && <PlaceholderChapter key="temples" title="Divine Stops" onBack={() => handleCompleteChapter(2)} />}
        {activeView === "cafes" && <PlaceholderChapter key="cafes" title="Cafe Dates" onBack={() => handleCompleteChapter(3)} />}
        {activeView === "escapes" && <PlaceholderChapter key="escapes" title="Our Escapes" onBack={() => handleCompleteChapter(4)} />}
        
      </AnimatePresence>
    </div>
  );
};