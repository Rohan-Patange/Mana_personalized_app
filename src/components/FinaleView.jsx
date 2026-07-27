// src/components/FinaleView.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import foreverImg from "../assets/forever.jpg";

export const FinaleView = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const finalMessage = "I love you, Bayko ❤️ 🧸";
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const chapters = [
    {
      title: "The Seven Pheras",
      subtitle: "Dec 6, 2025 – Dec 20, 2025",
      text: `Our marriage wasn’t bound by a single crowded hall or a single day. It happened organically, guided by something higher across sacred grounds.\n\nIt began with our 1st phera on December 6, 2025, around the Agni Kund at Mahanaleshwar. Then came the next pheras near the Havan Kund at the Kothrud Kuldevi temple. And finally, we completed our seven sacred pheras by doing the Pradakshina around the holy temple at Ganpatipule on December 20, 2025.\n\nNo priests telling us how to stand. Just two souls making vows to the universe.`,
      tag: "The Unplanned Sacred Bond 🌿"
    },
    {
      title: "The Mangalsutra Sacred Moment",
      subtitle: "January 27, 2026",
      text: `The mangalsutra arrived at my house. That very day, with whatever pure knowledge of pooja I held in my heart, I tied it around your neck myself.\n\nThere was no grand audience—just quiet walls, a racing heart, and the profound realization that you weren't just my partner anymore. You were my home. In that simple act at home, you became my legally and spiritually bound wife.`,
      tag: "The Sacred Thread 🤍"
    },
    {
      title: "The Tuljapur Dream & Sindoor",
      subtitle: "February 7, 2026",
      text: `Before we visited Tuljapur, I had a dream. In that dream, I saw the statue of Devi draped in a striking red saree.\n\nWhen we walked into the temple on February 7, my breath completely caught in my throat. The Devi was wearing that exact same red saree from my dream. It wasn't just a coincidence—it was the universe whispering to me, a divine sign that you are truly the one meant for me. Right then and there, in front of her grace, I took the step and applied the sindoor to your head.`,
      tag: "Written in the Stars ✨"
    },
    {
      title: "Our Private Vow",
      subtitle: "Eternal",
      text: `People spend lakhs on ceremonies trying to prove their love to the world. We didn't need to.\n\nOur marriage lives in the Agni Kund of Mahanaleshwar, the echoes of Ganpatipule, the mangalsutra tied with pure devotion at home, and the sacred sindoor of Tuljapur.\n\nYou are my wife, my half-body, my peace, and my forever.`,
      tag: "Mazi Bayko, Maza Aayushya ❤️"
    }
  ];

  useEffect(() => {
    if (isFinished && displayedText.length < finalMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(finalMessage.slice(0, displayedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else if (displayedText.length === finalMessage.length) {
      setIsTypingComplete(true);
    }
  }, [isFinished, displayedText]);

  const handleNext = () => {
    if (currentStep < chapters.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full flex flex-col bg-[#0d0a0f] text-white p-4 sm:p-6 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-rose-500/20 relative select-none items-center justify-center overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] bg-rose-900/15 blur-[150px] rounded-full pointer-events-none" />

      {/* FLOATING HEART SHOWER ANIMATION */}
      {isFinished && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(25)].map((_, i) => {
            const randomX = Math.random() * 100;
            const randomDuration = 4 + Math.random() * 6;
            const randomDelay = Math.random() * 5;
            const randomSize = 12 + Math.random() * 20;
            const randomOpacity = 0.3 + Math.random() * 0.7;

            return (
              <motion.div
                key={i}
                initial={{ y: "-10vh", x: `${randomX}vw`, opacity: 0, scale: 0.5 }}
                animate={{ 
                  y: "110vh", 
                  opacity: [0, randomOpacity, randomOpacity, 0],
                  scale: [0.5, 1, 1, 0.8],
                  x: `${randomX + (Math.sin(i) * 5)}vw` 
                }}
                transition={{
                  duration: randomDuration,
                  repeat: Infinity,
                  delay: randomDelay,
                  ease: "easeInOut"
                }}
                style={{ fontSize: `${randomSize}px`, position: "absolute" }}
                className="text-rose-500 select-none drop-shadow-[0_0_10px_rgba(244,63,94,0.6)]"
              >
                ❤️
              </motion.div>
            );
          })}
        </div>
      )}

      {!isFinished ? (
        <>
          <div className="text-center max-w-xl mx-auto mb-3 shrink-0 relative z-10">
            <span className="text-rose-400 text-[9px] tracking-[0.3em] uppercase font-bold block mb-0.5">
              The Final Chapter ✦ Our Private Marriage
            </span>
            <h1 className="font-['Playfair_Display',serif] text-xl sm:text-2xl font-bold tracking-wide text-white drop-shadow">
              How Our Forever Began
            </h1>
          </div>

          <div className="max-w-xl w-full relative z-10 my-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-gradient-to-br from-rose-950/40 via-zinc-900/90 to-black border border-rose-500/30 p-5 sm:p-7 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md relative"
              >
                <div className="flex justify-between items-center mb-3 border-b border-rose-500/20 pb-2.5">
                  <span className="text-[9px] font-mono text-rose-300 uppercase tracking-widest bg-rose-950/70 px-2.5 py-0.5 rounded-full border border-rose-500/30">
                    {chapters[currentStep].tag}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    0{currentStep + 1} / 0{chapters.length}
                  </span>
                </div>

                <h2 className="font-['Playfair_Display',serif] text-xl sm:text-2xl font-bold text-white mb-1">
                  {chapters[currentStep].title}
                </h2>
                <span className="text-[10px] font-mono text-rose-400/80 block mb-3">
                  {chapters[currentStep].subtitle}
                </span>

                <p 
                  style={{ fontFamily: "'Caveat', cursive" }}
                  className="text-base sm:text-lg font-normal leading-[26px] text-rose-50/90 tracking-wide whitespace-pre-line my-2"
                >
                  {chapters[currentStep].text}
                </p>

                <div className="flex justify-between items-center mt-5 pt-3 border-t border-white/10">
                  <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-lg transition-all ${
                      currentStep === 0 
                        ? "opacity-30 cursor-not-allowed text-zinc-600" 
                        : "text-rose-300 hover:text-white cursor-pointer bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    ← Previous
                  </button>

                  <button
                    onClick={handleNext}
                    className="bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-500/50 px-5 py-2 rounded-xl text-[10px] uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all cursor-pointer hover:scale-105"
                  >
                    {currentStep === chapters.length - 1 ? "Complete Our Story ❤️" : "Next Chapter ➔"}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex gap-1.5 mt-4 relative z-10">
            {chapters.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentStep === idx ? "w-6 bg-rose-500" : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>
        </>
      ) : (
        /* --- GRAND FINALE TYPEWRITER & PORTRAIT PHOTO SCREEN --- */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full bg-gradient-to-br from-rose-950/50 via-zinc-900/95 to-black border border-rose-500/40 p-6 sm:p-8 rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.9)] text-center relative z-10 flex flex-col items-center backdrop-blur-md"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-36 h-48 sm:w-40 sm:h-56 rounded-2xl overflow-hidden border-2 border-rose-500/40 shadow-[0_0_25px_rgba(244,63,94,0.3)] mb-5 bg-black relative"
          >
            <img 
              src={foreverImg} 
              alt="Hand in Hand" 
              className="w-full h-full object-cover filter brightness-105"
            />
          </motion.div>

          <h2 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-white mb-4 min-h-[36px] tracking-wide">
            {displayedText}
            {!isTypingComplete && <span className="animate-pulse text-rose-500">|</span>}
          </h2>

          <AnimatePresence>
            {isTypingComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="w-full"
              >
                <div className="w-12 h-px bg-rose-500/40 mx-auto mb-4" />
                <p 
                  style={{ fontFamily: "'Caveat', cursive" }}
                  className="text-lg sm:text-xl text-rose-200/90 leading-[28px] tracking-wide italic px-2"
                >
                  "Na koi hai na koi tha zindagi me tumhare siva, <br />
                  tum dena sath mera o hamnava..."
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};