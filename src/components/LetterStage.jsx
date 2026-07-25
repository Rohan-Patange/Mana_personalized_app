import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LETTER_CONFIG } from "../config/letterConfig";
import { AudioPlayer } from "./AudioPlayer";

export const LetterStage = ({ onNext }) => {
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);

  // Helper to format question prompt and style specific pet names if needed
  const renderQuestionPrompt = () => {
    const text = LETTER_CONFIG.questionPrompt;
    // If "Mazya Raja" is in the text, we can highlight/style it with the script font
    if (text.includes("Mazya Raja")) {
      const parts = text.split("Mazya Raja");
      return (
        <span>
          {parts[0]}
          <span className="font-['Dancing_Script',cursive] text-lg sm:text-xl font-bold text-[#7a1832]">
            Mazya Raja
          </span>
          {parts[1]}
        </span>
      );
    }
    return text;
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: "spring", stiffness: 240, damping: 25 }}
          className="relative w-full max-w-[380px] sm:max-w-[400px] max-h-[96dvh] bg-[#fffdf6] text-[#3d2b2e] border border-[#f5e2cc] rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.7)] my-auto flex flex-col justify-between overflow-x-hidden overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="absolute top-2 left-5 w-14 h-4 bg-rose-200/50 backdrop-blur-xs border-y border-dashed border-rose-300/40 -rotate-6 pointer-events-none shadow-xs" />
          <div className="absolute top-0 right-0 w-28 h-28 bg-[#fbeae2] rounded-bl-full pointer-events-none opacity-80" />

          <div className="space-y-1.5">
            <div className="w-full text-right mb-0.5 relative z-10">
              <span className="font-['Dancing_Script',cursive] text-xs sm:text-sm text-[#c0737a] italic tracking-wide block">
                {LETTER_CONFIG.headerTag}
              </span>
              <span className="text-[9px] font-medium text-[#b58b8d] tracking-wider block -mt-1">
                {LETTER_CONFIG.dateStamp}
              </span>
            </div>

            {/* Styled Recipient Name with Script Font */}
            <h1 className="font-['Dancing_Script',cursive] text-3xl sm:text-4xl font-bold text-[#671228] tracking-tight mb-1 relative z-10">
              {LETTER_CONFIG.letterRecipientName}
            </h1>

            <div className="w-full h-[1px] bg-[#eed2c2] mb-2" />

            <div className="space-y-2 text-[#4a3538] text-[11px] sm:text-xs leading-relaxed font-normal relative z-10 text-left">
              <p>{LETTER_CONFIG.paragraph1}</p>

              {LETTER_CONFIG.showPolaroid && (
                <div
                  onClick={() => setIsPhotoExpanded(true)}
                  className="my-1.5 p-1 bg-white rounded-xl shadow-md border border-[#ebdcd0] transform -rotate-1 hover:rotate-0 hover:scale-[1.02] transition-all duration-300 max-w-[240px] sm:max-w-[260px] mx-auto cursor-pointer group relative"
                >
                  <div className="w-full h-24 sm:h-28 rounded-lg overflow-hidden bg-[#f3e9e1] relative">
                    <img
                      src={LETTER_CONFIG.photoUrl}
                      alt="Memory"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "50% 53%" }}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-[10px] font-medium bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs shadow-sm">
                        🔍 Tap to Expand
                      </span>
                    </div>
                  </div>
                  <div className="pt-1 text-center font-['Dancing_Script',cursive] text-xs text-[#7a4b52] font-semibold">
                    {LETTER_CONFIG.photoCaption}
                  </div>
                </div>
              )}

              <p>{LETTER_CONFIG.paragraph2}</p>

              <p className="font-semibold text-[#671228] pt-0.5">
                {renderQuestionPrompt()}
              </p>
            </div>

            <div className="scale-90 origin-top my-1">
              <AudioPlayer />
            </div>

            
          </div>

          <button
            onClick={onNext}
            className="w-full bg-gradient-to-r from-[#e3125d] to-[#d81b5c] hover:from-[#c90c50] hover:to-[#be1250] active:scale-95 text-white font-bold py-2.5 px-4 rounded-xl shadow-[0_6px_18px_rgba(227,18,93,0.35)] text-xs sm:text-sm tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 border border-white/20 relative z-10 shrink-0 mt-1"
          >
            <span>Unlock Our Memories</span>
            <span className="text-base">✨</span>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isPhotoExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPhotoExpanded(false)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-pointer select-none"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#fffdf6] p-3 sm:p-4 rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full border border-rose-200 flex flex-col items-center"
            >
              <button
                onClick={() => setIsPhotoExpanded(false)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-rose-600 hover:bg-rose-700 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg transition-transform active:scale-90 cursor-pointer border-2 border-white z-10"
              >
                ✕
              </button>

              <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden bg-[#f3e9e1]">
                <img
                  src={LETTER_CONFIG.photoUrl}
                  alt="Expanded Memory"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-3 text-center font-['Dancing_Script',cursive] text-lg text-[#7a4b52] font-bold">
                {LETTER_CONFIG.photoCaption}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};