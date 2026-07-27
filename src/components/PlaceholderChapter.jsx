// src/components/PlaceholderChapter.jsx
import React from "react";
import { motion } from "framer-motion";

export const PlaceholderChapter = ({ title, onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#141017] p-6 text-center"
    >
      <div className="text-4xl mb-4">🚧</div>
      <h2 className="font-['Playfair_Display',serif] text-3xl font-bold text-white mb-4">{title}</h2>
      <p className="text-rose-200/60 text-sm mb-8">Memories are still rendering...</p>
      <button 
        onClick={onBack} 
        className="bg-white/10 hover:bg-white/20 transition-all px-6 py-3 rounded-full text-xs text-white uppercase tracking-widest border border-white/20 cursor-pointer"
      >
        Go Back
      </button>
    </motion.div>
  );
};