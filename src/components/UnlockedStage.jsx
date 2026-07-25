import React from "react";
import { motion } from "framer-motion";

export const UnlockedStage = ({ onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative z-20 w-full max-w-sm p-6 sm:p-8 bg-[#161217]/90 backdrop-blur-xl rounded-3xl border border-rose-500/30 shadow-[0_25px_60px_rgba(244,63,94,0.35)] text-center my-auto"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-rose-500/40 animate-bounce">
        <span className="text-3xl">🎉</span>
      </div>

      <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-200 via-rose-300 to-white bg-clip-text text-transparent">
        Access Granted! 💖
      </h2>

      <p className="text-zinc-300 text-xs sm:text-sm mt-3 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
        You unlocked the final secret! Wishing you endless happiness, warmth, and beautiful memories ahead.
      </p>

      <button
        onClick={onReset}
        className="mt-5 w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 px-5 rounded-full text-xs transition-all border border-white/10 cursor-pointer"
      >
        Replay Experience 🔄
      </button>
    </motion.div>
  );
};