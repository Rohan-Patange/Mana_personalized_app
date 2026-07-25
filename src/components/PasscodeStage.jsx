import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PASSCODE_CONFIG = {
  correctWord: "Aashritha", // Must match this exact case
  riddleText: "What represents our ultimate sanctuary, a silent prayer etched into tomorrow, and the single word that holds the blueprint of our entire future?",
  clueText1: "Think about the legacy of protection and shelter we wish to create, and a name that begins with the very first letter of the alphabet.",
  clueText2: "Okay, ultimate rescue hint: It starts with 'A' and is the exact name we chose for our future daughter!"
};

// Heart Shower Component for Magical Transition
const HeartRain = () => {
  const hearts = Array.from({ length: 30 });
  return (
    <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
      {hearts.map((_, i) => {
        const randomX = Math.random() * 100;
        const randomDuration = 1.2 + Math.random() * 1.5;
        const randomDelay = Math.random() * 0.4;
        const randomScale = 0.8 + Math.random() * 1.5;

        return (
          <motion.div
            key={i}
            initial={{ y: "-10vh", x: `${randomX}vw`, opacity: 1, scale: randomScale }}
            animate={{ y: "110vh", opacity: [1, 1, 0] }}
            transition={{ duration: randomDuration, delay: randomDelay, ease: "easeIn" }}
            className="absolute text-xl sm:text-2xl"
          >
            ❤️
          </motion.div>
        );
      })}
    </div>
  );
};

export const PasscodeStage = ({ onSuccess }) => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Strict case-sensitive check (removes whitespace trimming only, keeps exact casing)
    if (passcode.trim() === PASSCODE_CONFIG.correctWord) {
      setIsUnlocked(true);
      setTimeout(() => {
        onSuccess();
      }, 1600);
    } else {
      setError(true);
      setAttempts((prev) => prev + 1);
      setPasscode(""); // Clears the input box on failure
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isUnlocked && <HeartRain />}
      </AnimatePresence>

      <motion.div 
        animate={isUnlocked ? { opacity: [1, 1, 0] } : { opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={isUnlocked ? { scale: [1, 1.05, 0.9] } : { opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: "spring", stiffness: 240, damping: 25 }}
          className="relative w-full max-w-[380px] sm:max-w-[420px] bg-[#1a1417] text-[#f4e8eb] border border-rose-500/30 rounded-[24px] sm:rounded-[30px] p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden"
        >
          {/* Top Lock Icon */}
          <div className="flex flex-col items-center text-center">
            <motion.div
              animate={isUnlocked ? { scale: [1, 3.5, 7], rotate: [0, 15, -15, 0], opacity: [1, 1, 0] } : {}}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center mb-3 shadow-inner relative z-10"
            >
              <span className="text-xl">{isUnlocked ? "🔓" : "🔒"}</span>
            </motion.div>

            <h2 className="font-['Playfair_Display',serif] text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
              Passcode Checkpoint
            </h2>
            
            <p className="font-['Dancing_Script',cursive] text-rose-300 text-lg sm:text-xl tracking-wide">
              {isUnlocked ? "Let the journey begin... ❤️✨" : "Wait dear, first you need to unlock it... ✨"}
            </p>
          </div>

          {/* Riddle Box */}
          <div className="my-4 p-3.5 bg-[#251b20] rounded-xl border border-rose-500/20 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-md">
                🧩 Fun Riddle
              </span>
              {attempts > 0 && !isUnlocked && (
                <span className="text-[10px] text-rose-400 font-medium">
                  Attempts: {attempts}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#ebdcdc] italic font-medium leading-relaxed">
              "{PASSCODE_CONFIG.riddleText}"
            </p>

            {/* Clue Tier 1: Appears after 3 attempts */}
            <AnimatePresence>
              {attempts >= 3 && attempts < 5 && !isUnlocked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-2 border-t border-rose-500/20 text-[11px] text-rose-200/90"
                >
                  <span className="font-semibold text-rose-300">💡 Secret Clue (3 Tries):</span> {PASSCODE_CONFIG.clueText1}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Clue Tier 2: Appears after 5+ attempts */}
            <AnimatePresence>
              {attempts >= 5 && !isUnlocked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-2 border-t border-rose-500/20 text-[11px] text-rose-200/90"
                >
                  <span className="font-semibold text-rose-300">🚨 Major Rescue Hint (5+ Tries):</span> {PASSCODE_CONFIG.clueText2}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Password Input Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <motion.div
              animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Type the secret word..."
                disabled={isUnlocked}
                className="w-full bg-[#251b20] border border-rose-500/30 focus:border-rose-500 text-center text-white placeholder-[#7a5e65] text-sm py-3 px-4 rounded-xl outline-none shadow-inner tracking-widest font-medium transition-all disabled:opacity-50"
                autoFocus
              />
            </motion.div>

            <button
              type="submit"
              disabled={isUnlocked}
              className="w-full bg-gradient-to-r from-[#e3125d] to-[#d81b5c] hover:from-[#c90c50] hover:to-[#be1250] active:scale-95 text-white font-bold py-3 px-4 rounded-xl shadow-[0_6px_20px_rgba(227,18,93,0.4)] text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/20 disabled:opacity-50"
            >
              <span>{isUnlocked ? "Unlocked!" : "Unlock Memories"}</span>
              <span className="text-base">{isUnlocked ? "✨" : "🔒"}</span>
            </button>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};