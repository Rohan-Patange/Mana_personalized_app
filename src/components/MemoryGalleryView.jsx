// src/components/MemoryGalleryView.jsx
import React from "react";
import { motion } from "framer-motion";

export const MemoryGalleryView = ({ onComplete }) => {
  const photos = [
    { src: "https://images.unsplash.com/photo-1518173946687-a4c8a98039f5?q=80&w=600", caption: "Day 1 Sparks" },
    { src: "https://images.unsplash.com/photo-1511216113906-8f57bb83e776?q=80&w=600", caption: "Tamhini drive selfie" },
    { src: "https://images.unsplash.com/photo-1522673607200-164483ee951a?q=80&w=600", caption: "Late night maggi station" },
    { src: "https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?q=80&w=600", caption: "Divine temple blessing" },
    { src: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=600", caption: "Our Favorite Escape view" },
    { src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=600", caption: "Passenger princess sleeps" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 z-50 w-full h-full flex flex-col bg-[#050505] text-white p-6 sm:p-10 overflow-y-auto pb-28 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-rose-500/20"
    >
      <div className="text-center max-w-3xl mx-auto mb-10 shrink-0 mt-8">
        <span className="text-rose-400 text-[10px] tracking-[0.3em] uppercase font-bold block mb-2">A Visual Prelude</span>
        <h1 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-bold tracking-wide">Memory Gallery</h1>
      </div>

      <div className="flex-1 max-w-6xl mx-auto w-full pr-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {photos.map((photo, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="aspect-square rounded-3xl overflow-hidden border border-white/5 shadow-xl group relative cursor-pointer"
                >
                    <img 
                      src={photo.src} 
                      alt={photo.caption} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-x-0 bottom-0 p-4 flex items-end">
                        <span className="text-xs font-medium text-white tracking-wider font-['Playfair_Display',serif]">{photo.caption}</span>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>

      {/* --- CONSISTENT BOTTOM BUTTON --- */}
      <div className="w-full flex flex-col items-center gap-3 pt-12 border-t border-white/10 mt-10 pb-10">
        <button
          onClick={onComplete} 
          className="w-full max-w-[380px] bg-rose-950/50 hover:bg-rose-900/80 border border-rose-500/30 text-rose-200 font-bold py-4 px-4 rounded-2xl text-[10px] tracking-[0.2em] uppercase transition-all cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.1)] hover:shadow-[0_0_30px_rgba(244,63,94,0.3)] hover:-translate-y-0.5"
        >
          Return to the Sanctum ➔
        </button>
      </div>
    </motion.div>
  );
};