// src/components/UnlockedStage.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import your isolated route components
import { WhereItBeganView } from "./WhereItBeganView";
import { CravingsAndComfortsView } from "./CravingsAndComfortsView";
import { PlaceholderChapter } from "./PlaceholderChapter";

// Ensure this matches your exact file name in the assets folder!
import ourJourneyMap from "../assets/our-journey-map.png";

export const UnlockedStage = ({ onReset }) => {
  const [activeView, setActiveView] = useState("hub");
  
  // CHANGED: Start at -1 so Chapter 0 is locked by default
  const [unlockProgress, setUnlockProgress] = useState(-1); 
  const [isImageExpanded, setIsImageExpanded] = useState(false);

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
            {isUnlocked 
              ? desc 
              : chapterIndex === 0 
                ? "Expand 'The Map of Our Hearts' to begin your journey." 
                : "Complete the preceding chapter to unlock this memory."}
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="absolute inset-0 z-25 w-full h-full bg-[#0d0a0f] overflow-hidden">
      
      {/* MAIN VIEW ROUTING */}
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
            
            {/* PAGE BANNER / HEADER */}
            <div className="text-center max-w-3xl mx-auto mb-6 shrink-0">
              <span className="text-rose-400 text-[10px] tracking-[0.4em] uppercase font-bold block mb-2">
                The Story of Us
              </span>
              <h1 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-white tracking-wide mb-1">
                10 Months
              </h1>
              <p className="font-['Playfair_Display',serif] text-sm sm:text-base italic text-zinc-400 tracking-widest">
                & counting thousands of kilometers...
              </p>
            </div>

            {/* TWO-PANE LAYOUT */}
            <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT PANE */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Clickable Map Image Card */}
                <div 
                  onClick={() => {
                    setIsImageExpanded(true);
                    if (unlockProgress === -1) {
                      setUnlockProgress(0); 
                    }
                  }}
                  className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black/80 backdrop-blur-md group cursor-pointer w-full aspect-[16/10]"
                >
                  <img 
                    src={ourJourneyMap} 
                    alt="Our Journey Map" 
                    className="w-full h-full object-contain p-1.5 filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  <span className="absolute bottom-3 left-3 text-[10px] tracking-widest text-rose-300 uppercase font-bold bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-rose-500/30 shadow">
                    🗺️ The Map of Our Hearts
                  </span>

                  {/* Click to Expand Hint */}
                  <div className={`absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border text-[9px] text-white tracking-wider uppercase flex items-center gap-1 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all
                    ${unlockProgress === -1 ? 'border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)] animate-pulse' : 'border-white/20'}
                  `}>
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
                  <p className="text-zinc-300 text-sm leading-relaxed font-light italic opacity-90 tracking-wide">
                    "Ten months, thousands of kilometers, and an endless map of roads later, I’ve realized something true: no matter how far we drive, I’m never searching for a destination. With you in the passenger seat, every highway, every quiet cafe, and every midnight stop isn't a place we're visiting—it's just me coming home."
                  </p>
                </div>

              </div>

              {/* RIGHT PANE: Bento Grids */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="mb-1 hidden lg:block">
                  <h3 className="text-sm font-semibold text-zinc-400 tracking-wider uppercase">Unlocked Chapters</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* CHAPTER 1: Where It All Began */}
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

                  {/* CHAPTER 2: Cravings & Comforts (Now matching rose theme) */}
                  <BentoCard 
                    title="Cravings & Comforts"
                    desc="Breakfast dates, late-night Maggi, cozy cafes, and the magic of food made by you."
                    icon="🍜"
                    colSpan="sm:col-span-2 col-span-1"
                    chapterIndex={1}
                    viewId="food"
                    bgGradient="bg-gradient-to-br from-rose-950/50 via-zinc-900/80 to-black"
                    borderColor="border-rose-500/30 hover:border-rose-500/60"
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

        {/* ROUTE: WHERE IT ALL BEGAN */}
        {activeView === "began" && (
          <WhereItBeganView key="began" onComplete={() => handleCompleteChapter(0)} />
        )}
        {/* ROUTE: CRAVINGS & COMFORTS */}
        {activeView === "food" && (
          <CravingsAndComfortsView key="food" onComplete={() => handleCompleteChapter(1)} />
        )}
        {/* ROUTES: PLACEHOLDERS */}
        {activeView === "drives" && <PlaceholderChapter key="drives" title="Midnight Therapy" onBack={() => handleCompleteChapter(1)} />}
        {activeView === "temples" && <PlaceholderChapter key="temples" title="Divine Stops" onBack={() => handleCompleteChapter(2)} />}
        {activeView === "cafes" && <PlaceholderChapter key="cafes" title="Cafe Dates" onBack={() => handleCompleteChapter(3)} />}
        {activeView === "escapes" && <PlaceholderChapter key="escapes" title="Our Escapes" onBack={() => handleCompleteChapter(4)} />}
        
      </AnimatePresence>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {isImageExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageExpanded(false)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-3xl border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={ourJourneyMap} 
                alt="Expanded Journey Map" 
                className="w-full h-full object-contain max-h-[90vh]"
              />
              <button 
                onClick={() => setIsImageExpanded(false)}
                className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white text-xs px-5 py-2.5 rounded-full border border-white/30 backdrop-blur-md transition-all cursor-pointer uppercase tracking-wider font-medium shadow-lg"
              >
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};