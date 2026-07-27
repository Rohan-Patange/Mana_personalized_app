// src/components/SecretGateway.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const SecretGateway = ({ onUnlock }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorShake, setErrorShake] = useState(false);

  // The Options - indices 0 and 3 are the real answers!
  // The others are highly plausible decoys from your actual journey.
  const options = [
    { id: 0, text: "The way you gently run your hand around my head." }, // Correct
    { id: 1, text: "When you rest your head on my shoulder while I drive." }, // Decoy (from Ch 4)
    { id: 2, text: "Stealing quiet kisses in the car after dark." }, // Decoy (from Ch 4)
    { id: 3, text: "The sweet way you call me 'Baal'." }, // Correct
    { id: 4, text: "When you happily feed me snacks on the highway." } // Decoy (from Ch 4)
  ];

  const handleSelect = (id) => {
    if (isUnlocked) return;

    let newSelection;
    if (selectedOptions.includes(id)) {
      newSelection = selectedOptions.filter(item => item !== id);
    } else {
      newSelection = [...selectedOptions, id];
    }
    
    setSelectedOptions(newSelection);
  };

  // Check the answer every time the selection changes
  useEffect(() => {
    // She needs exactly 0 and 3.
    const hasCorrectAnswers = selectedOptions.includes(0) && selectedOptions.includes(3);
    // Any of these means she guessed wrong.
    const hasWrongAnswers = selectedOptions.includes(1) || selectedOptions.includes(2) || selectedOptions.includes(4);

    if (selectedOptions.length === 2) {
      if (hasCorrectAnswers && !hasWrongAnswers) {
        // SUCCESS!
        setIsUnlocked(true);
        setTimeout(() => {
          onUnlock(); 
        }, 2000);
      } else {
        // WRONG COMBINATION - Trigger a gentle shake
        setErrorShake(true);
        setTimeout(() => {
          setErrorShake(false);
          setSelectedOptions([]); // Reset so she can try again
        }, 600);
      }
    }
  }, [selectedOptions, onUnlock]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} // Cinematic shatter/blur exit
      transition={{ duration: 0.8 }}
      className="absolute inset-0 z-50 w-full h-full bg-[#050505] flex flex-col items-center justify-center p-6 sm:p-10 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isUnlocked ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-rose-900/40 via-black to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/20 blur-[100px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="puzzle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, x: errorShake ? [-10, 10, -10, 10, 0] : 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, x: { type: "spring", stiffness: 300, damping: 10 } }}
            className="w-full max-w-lg relative z-10"
          >
            <div className="text-center mb-10">
              <span className="text-zinc-500 text-[10px] tracking-[0.4em] uppercase font-bold block mb-4">
                Security Check
              </span>
              <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-white tracking-wide leading-relaxed">
                What is my ultimate <span className="text-rose-400 italic">love language</span> when you are around?
              </h2>
              <p className="text-zinc-400 text-xs mt-4 tracking-widest uppercase">
                (Select the <span className="text-white font-bold">two</span> correct answers)
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`
                    w-full p-5 rounded-2xl text-left transition-all duration-300 border backdrop-blur-sm
                    ${selectedOptions.includes(option.id) 
                      ? "bg-white/10 border-rose-400/50 text-white shadow-[0_0_15px_rgba(244,63,94,0.2)]" 
                      : "bg-white/[0.02] border-white/10 text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200"}
                  `}
                >
                  <span className="text-sm font-light tracking-wide">{option.text}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center relative z-10"
          >
            <span className="text-5xl mb-6 block animate-bounce">🔓</span>
            <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-bold text-white tracking-wide mb-3 drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]">
              Vault Unlocked
            </h2>
            <p className="text-rose-200 text-sm tracking-widest uppercase font-light">
              Welcome to the Inner Sanctum, Baal.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};